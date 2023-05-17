import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {ResponseModel} from '../interfaces/gpt-response.interface';
import {Configuration, OpenAIApi} from 'openai';
import {environment} from 'src/environments/environment';
import {CreateChatCompletionRequest} from 'openai';
import {CreateEditRequest} from "openai/api";

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

  createChatCompletion(prompt: string): Observable<any> {
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
    // return this.http.post<ResponseModel>('https://api.openai.com/v1/chat/completions', body, {
    //   headers: this.header,
    // });
    return from(this.openai.createChatCompletion(body));
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

  createEdit(prompt: string): Observable<any> {
    const body: CreateEditRequest = {
      model: 'text-davinci-edit-001',
      input: prompt,
      instruction: "Corrige los errores de escritura",
      // instruction: "Fix the spelling mistakes",
      // instruction: "Please edit the following sentence for grammar and clarity",
      // instruction: "Make this email more professional and concise",
    };
    return this.http.post<ResponseModel>('https://api.openai.com/v1/edits', body, {
      headers: this.header,
    });
  }
}
