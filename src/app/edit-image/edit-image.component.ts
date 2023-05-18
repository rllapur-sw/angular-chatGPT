import {Component} from '@angular/core';
import {Message} from '../interfaces/gpt-response.interface';
import {OpenaiService} from '../services/openai.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent {
  answer: string = '';
  promptText = '';
  showSpinner = false;
  textMode = false;
  imageUrl = '';

  constructor(private openaiService: OpenaiService) {
  }

  getText(message: Message) {
    return message.content.split('\n').filter((f) => f.length > 0);
  }

  async callOpenAIAPIMethod(isText: boolean) {
    if (this.promptText.length < 2) return;
    try {
      this.answer = '';
      this.imageUrl = '';
      this.showSpinner = true;
      if (isText) {
        this.openaiService.createEdit(this.promptText).subscribe(({choices}) => {
          this.answer = choices[0].text;
          this.showSpinner = false;
          this.textMode = true;
          this.promptText = '';
        });
      } else {
        this.openaiService.generateImage(this.promptText).subscribe((response: any) => {
          this.textMode = false;
          this.imageUrl = response.data[0].url;
          this.showSpinner = false;
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
