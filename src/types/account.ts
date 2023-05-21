export type Account = {
  id: number;
  name: string;
  kind: 'saving' | 'spending';
  currencyCode: string;
  balance: number;
  initialBalance: number;
}

export type AccountUpdate = {
  id: number;
  name?: string;
  kind?: 'saving' | 'spending';
  currencyCode?: string;
  balance?: number;
}

export type AccountAPIErrors = {
  name?: Array<string>;
  kind?: Array<string>;
  currencyCode?: Array<string>;
  initialBalance?: Array<string>;
  balance?: Array<string>;
  nonFieldErrors?: Array<string>;
  detail?: string;
}
