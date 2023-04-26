import { Component } from '@angular/core';
import { gptModels } from '../models/constants';
import { ChatWithBot, ResponseModel } from '../models/gpt-response';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent {
  chatConversation: ChatWithBot[] = [];
  response!: ResponseModel | undefined;
  gptModels = gptModels;
  promptText = '';
  showSpinner = false;

  constructor(private chatService: ChatService) {}

  checkResponse(): void {
    this.pushChatContent(this.promptText, 'You', 'person');
    this.invokeGPT();
  }

  pushChatContent(response: string, person: string, cssClass: string): void {
    const chatToPush: ChatWithBot = { person, response, cssClass };
    this.chatConversation.push(chatToPush);
  }

  getText(data: string): string[] {
    return data.split('\n').filter((f) => f.length > 0);
  }

  async invokeGPT() {
    if (this.promptText.length < 2) return;

    try {
      this.response = undefined;
      this.showSpinner = true;

      this.chatService.createCompletionSendMessage(this.promptText).subscribe((apiResponse: ResponseModel) => {
        console.log('apiResponse', apiResponse);
        this.response = apiResponse.data as ResponseModel;
        this.pushChatContent(this.response.choices[0].text.trim(), 'Mr Bot', 'bot');
        this.showSpinner = false;
        this.promptText = '';
      });
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
