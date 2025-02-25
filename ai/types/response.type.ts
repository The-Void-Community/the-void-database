import { Models } from "./models.types";

export type AiResponse<T extends unknown> = {
  model: Models;
  data?: T;
  text: string;
  type: 0 | 1;
};
