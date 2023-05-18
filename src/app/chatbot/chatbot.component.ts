import {Component} from '@angular/core';
import {ChatWithBot, ResponseModel} from '../interfaces/gpt-response.interface';
import {OpenaiService} from '../services/openai.service';

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
  total_tokens = 0;
  modelUsed = '';

  constructor(private openaiService: OpenaiService) {
  }

  onAskGPT(): void {
    this.pushChatContent(this.promptText, [], 'You');
    this.getChatCompletion();
  }

  pushChatContent(question: string, answers: string[], person: string): void {
    const chatToPush: ChatWithBot = {question, answers, person};
    this.chatConversation.push(chatToPush);
  }

  getChatCompletion(): void {
    if (this.promptText.length < 2) return;
    try {
      this.showSpinner = true;
      this.openaiService.createChatCompletion(this.promptText).subscribe(({choices, usage, model}) => {
        this.total_tokens = usage.total_tokens;
        this.modelUsed = model;
        this.showSpinner = false;
        this.pushChatContent(this.promptText, choices[0].message.content.split('\n'), 'Mr Bot');
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
