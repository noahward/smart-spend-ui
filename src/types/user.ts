export type User = {
  email: string;
  firstName: string;
  lastName:string;
  authToken: string;
}

export type UserAPIErrors = {
  nonFieldErrors?: Array<string>;
}
