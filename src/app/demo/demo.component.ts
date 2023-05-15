import {Component} from '@angular/core';
import {Choice, Message} from '../interfaces/gpt-response.interface';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['demo.component.scss'],
})
export class DemoComponent {
  choices: Choice[] | undefined;
  promptText = '';
  showSpinner = false;
  total_tokens = 0;
  textMode = false;
  imageUrl = '';
  modelUsed = '';

  constructor(private chatService: ChatService) {
  }

  getText(message: Message) {
    return message.content.split('\n').filter((f) => f.length > 0);
  }

  async invokeGPT(isText: boolean) {
    if (this.promptText.length < 2) return;
    try {
      this.choices = [];
      this.imageUrl = '';
      this.showSpinner = true;
      if (isText) {
        this.chatService.createChatCompletion(this.promptText).subscribe(({choices, usage, model}) => {
          this.choices = choices;
          this.total_tokens = usage.total_tokens;
          this.modelUsed = model;
          this.showSpinner = false;
          this.textMode = true;
          this.promptText = '';
        });
      } else {
        this.chatService.generateImage(this.promptText).subscribe((response: any) => {
          this.textMode = false;
          this.imageUrl = response.data[0].url;
          this.showSpinner = false;
          this.modelUsed = '';
          this.promptText = '';
        });
      }
    } catch (error: any) {
      this.showSpinner = false;
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }
}
