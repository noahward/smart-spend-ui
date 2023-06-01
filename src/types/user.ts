export type User = {
  email: string;
  firstName: string;
  lastName:string;
  authToken: string;
}

export type UserAPIErrors = {
  email?: Array<string>;
  firstName?: Array<string>;
  lastName?: Array<string>;
  password?: Array<string>;
  nonFieldErrors?: Array<string>;
}
