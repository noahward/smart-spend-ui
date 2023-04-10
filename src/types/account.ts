export type Account = {
  id: number;
  name: string;
  kind: 'saving' | 'spending';
  balance: number;
  initialBalance: number;
}

export type AccountUpdate = {
  id: number;
  name?: string;
  kind?: 'saving' | 'spending';
  balance?: number;
}

export type AccountAPIErrors = {
  name?: Array<string>;
  kind?: Array<string>;
  initialBalance?: Array<string>;
  balance?: Array<string>;
  nonFieldErrors?: Array<string>;
  detail?: string;
}
