export type Category = {
  id: number;
  name: string;
  user: number | null;
}

export type CategoryAPIErrors = {
  name?: Array<string>;
  user?: Array<string>;
  nonFieldErrors?: Array<string>;
  detail?: string;
}
