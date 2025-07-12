import { Ollama as OllamaAi } from "ollama";
import type { ChatRequest, ChatResponse, Message } from "ollama";

import { settings, lafSettings } from "../types/settings.type";

export const REQUEST: ChatRequest = {
  model: "gemma3:12b",
};

export const ROLE = "user" as const;
export const ollama = new OllamaAi();

export const developerParams: Message[] = Object.keys(settings).map((k) => {
  return <Message>{
    model: REQUEST.model,
    role: "developer",
    content: (settings as { [key: string]: string })[k],
  };
});
export const developerLafParams: Message[] = Object.keys(lafSettings).map(
  (k) => {
    return <Message>{
      model: REQUEST.model,
      role: "developer",
      content: (lafSettings as { [key: string]: string })[k],
    };
  },
);

const params = [...developerParams, ...developerLafParams];

export class Ollama {
  private stringChat(
    promt: string,
  ): Promise<{ content: string; data: ChatResponse }> {
    return new Promise((resolve, reject) => {
      ollama
        .chat({
          model: REQUEST.model,
          stream: false,
          messages: [...params, { role: ROLE, content: promt }],
        })
        .then((data) =>
          resolve({ content: data.message.content, data } as const),
        )
        .catch((error) => reject(error));
    });
  }

  private stringStreamChat(promt: string) {
    return ollama.chat({
      model: REQUEST.model,
      stream: true,
      messages: [...params, { role: ROLE, content: promt }],
    });
  }

  public chat(
    promt: string | Partial<ChatRequest>,
  ): Promise<{ content: string; data: ChatResponse }> {
    if (typeof promt === "string") {
      return this.stringChat(promt);
    }

    return new Promise((resolve, reject) => {
      ollama
        .chat({
          model: REQUEST.model,
          options: REQUEST.options,
          ...promt,
          messages: [...params, ...(promt.messages || [])],
          stream: false,
        })
        .then((data) => resolve({ content: data.message.content, data }))
        .catch((error) => reject(error));
    });
  }

  public streamChat(promt: string | Partial<ChatRequest>) {
    if (typeof promt === "string") {
      return this.stringStreamChat(promt);
    }

    return ollama.chat({
      model: REQUEST.model,
      options: REQUEST.options,
      ...promt,
      messages: [...params, ...(promt.messages || [])],
      stream: true,
    });
  }

  get ollama(): OllamaAi {
    return ollama;
  }
}

export default Ollama;
