export type UserData = {
  id: number;
  email: string;
  firstName: string;
  lastName:string;
}

export type TokenData = {
  key: string;
  expiry: string;
}

export type User = {
  profile: UserData;
  token: TokenData;
}

export type UserAPIErrors = {
  email?: Array<string>;
  firstName?: Array<string>;
  lastName?: Array<string>;
  nonFieldErrors?: Array<string>;
  detail?: string;
}
