import {Component} from '@angular/core';
import {ChatWithBot, ResponseModel} from '../interfaces/gpt-response.interface';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  chatConversation: ChatWithBot[] = [];
  response!: ResponseModel | undefined;
  promptText = '';
  showSpinner = false;

  constructor(private chatService: ChatService) {
  }

  checkResponse(): void {
    this.pushChatContent(this.promptText, 'You', 'person');
    this.invokeGPT();
  }

  pushChatContent(data: string, person: string, cssClass: string): void {
    const chatToPush: ChatWithBot = {data, person, cssClass};
    this.chatConversation.push(chatToPush);
  }

  async invokeGPT() {
    if (this.promptText.length < 2) return;

    try {
      this.response = undefined;
      this.showSpinner = true;
      this.chatService.createCompletionSendMessage(this.promptText).subscribe((apiResponse: ResponseModel) => {
        this.response = apiResponse.data as ResponseModel;
        this.pushChatContent(this.response.choices[0].text.trim(), 'Mr Bot', 'bot');
        this.showSpinner = false;
        this.promptText = '';
      });
    } catch (error: any) {
      this.showSpinner = false;
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }
}
