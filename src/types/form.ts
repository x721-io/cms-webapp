import { Address } from "wagmi";
import { Round } from "./launchpad";

export namespace FormState {
    export interface Login {
        username: string;
        password: string;
    }

    export interface CreateAccount {
        avatar: Blob[];
        username: string;
        fullName: string;
        password: string;
        email: string;
        twitterLink?: string;
        telegramLink?: string;
        phone: string;
        roles: string[];
    }

  export interface UpdateRound {
    id: string;
    name: string;
    type: string;
    description: string;
  }
  export interface CreateRound {
    nameRound: string;
    descriptionRound: string;
    instructionRound: string;
    type: string;
    totalNFT: string;
    price: string;
    start: String;
    end: string;
    startClaim: string;
    stackingEnd: string;
    quantity: string;
  }
  export interface UpdateAccountInfo {
    username: string;
    email: string;
    twitterLink?: string;
    telegramLink?: string;
    phone: string;
  }

    export interface Project {
        id: string;
        name: string;
        type: string;
        description: string;
        rounds: CreateRound;
    }

    export interface CreateRound {
        name: string;
        type: string;
        description: string;
    }
    export interface UpdateAccountInfo {
        username: string;
        fullName: string;
        email: string;
        twitterLink?: string;
        telegramLink?: string;
        phone: string;
    }

    export interface UpdateRoles {
        id: string;
        roles: string[];
    }

    export interface UpdateAvatar {
        avatar: Blob[];
    }

    export interface UpdateProject {
      name: string;
      collection: string;
      description: string;
      discord: string;
      facebook: string;
      instagram: string;
      twitter: string;
      telegram: string;
      address: Address;
      banner: string;
      organization: string;
      logo: string;
      collectionAddress: string;
    }
    export interface CreateProject { 
      name: string;
      collection: string;
      description: string;
      discord: string;
      facebook: string;
      instagram: string;
      twitter: string;
      telegram: string;
      address: Address;
      banner: string;
      organization: string;
      logo: string;
      collectionAddress: string;
      rounds: Round[];
      idOnchain: string;
    }
    export interface ResetPassword {
        id: string;
        newPassword: string;
        confirmPassword: string;
    }

    export interface ChangePassword {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }
}
