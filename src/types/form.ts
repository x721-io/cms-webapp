export namespace FormState {
  export interface Login {
    username: string;
    password: string;
  }

  export interface CreateAccount {
    avatar: Blob[]
    username: string;
    password: string;
    email: string
    twitterLink?: string
    telegramLink?: string
    phone: string
    roles: string[];
  }
}