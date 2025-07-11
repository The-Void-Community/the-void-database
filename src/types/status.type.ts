export type IResponse<T, K = null> = {
  text: string;
} & (
  | {
      successed: false;
      resource: K;
      error: Error;
    }
  | {
      successed: true;
      resource: T;
      error: null;
    }
);

export class SelfError<T = null> {
  public readonly successed: false = false;
  public readonly error: Error;
  public readonly resource: T | null;
  public readonly text: string;

  public constructor(
    error: Error | string,
    data?: {
      resource?: T;
      text?: string;
    },
  ) {
    this.error = typeof error === "string" ? new Error(error) : error;

    if (data) {
      this.text = data.text || this.error.message;
      this.resource = data.resource || null;
    } else {
      this.text = this.error.message;
      this.resource = null;
    }
  }
}

export class SelfStatus<T> {
  public readonly successed: true = true;
  public readonly error: null = null;

  public readonly text: string;
  public readonly resource: T;

  public constructor(resource: T, text: string) {
    this.resource = resource;
    this.text = text;
  }
}
