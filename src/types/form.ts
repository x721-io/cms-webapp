export namespace FormState {
  export interface Login {
    username: string;
    password: string;
  }

  export interface CreateAccount {
    username: string;
    password: string;
    avatar: Blob[]
    email: string
    twitterLink: string
    telegramLink: string
    phone: string
  }
}