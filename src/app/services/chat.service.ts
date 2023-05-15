import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {ResponseModel} from '../interfaces/gpt-response.interface';
import {Configuration, OpenAIApi} from 'openai';
import {environment} from 'src/environments/environment';
import {CreateChatCompletionRequest} from 'openai';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private openai: OpenAIApi;

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.apiKey}`,
  });

  data = {
    temperature: 0.95,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  constructor(private http: HttpClient) {
    const config = new Configuration({apiKey: environment.apiKey});
    this.openai = new OpenAIApi(config);
  }

  createChatCompletion(prompt: string): Observable<ResponseModel> {
    const body: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: "assistant",
          content: prompt
        }
      ],
      ...this.data
    };
    return this.http.post<ResponseModel>('https://api.openai.com/v1/chat/completions', body, {
      headers: this.header,
    });
    // return from(this.openai.createChatCompletion(body));
  }

  createCompletionSendMessage(prompt: string): Observable<any> {
    const body = {
      prompt,
      model: 'text-davinci-003',
      ...this.data
    };
    return from(this.openai.createCompletion(body));
  }

  generateImage(prompt: string): Observable<any> {
    const body = {
      prompt,
      n: 1,
      size: '256x256',
      response_format: 'url'
    };
    return this.http.post<any>('https://api.openai.com/v1/images/generations', body, {
      headers: this.header,
    });
  }
}
