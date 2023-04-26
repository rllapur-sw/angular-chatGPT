export interface ResponseModel {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  data?: ResponseModel;
}

export interface Choice {
  message: Message;
  text: string;
  index: number;
  logprobs?: any;
  finish_reason: string;
}

export interface Message {
  content: string;
  role: string;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatWithBot {
  person: string;
  response: string;
  cssClass: string;
}
