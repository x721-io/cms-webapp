import { Collection, User } from "../types/entitites";

export const classNames = (
  ...classes: (string | undefined | null | boolean)[]
) => {
  return classes.filter(Boolean).join(" ");
};

export const getUserAvatarImage = (
  user?: Partial<Pick<User, "username" | "avatar">> | null
) => {
  return user && user.avatar ? user.avatar : `https://avatar.vercel.sh/${user?.username}`;
};

export const getCollectionAvatarImage = (
  collection?: Partial<Pick<Collection, "name" | "avatar">> | null
) => {
  return collection?.avatar || `https://avatar.vercel.sh/${collection?.name}`;
};
