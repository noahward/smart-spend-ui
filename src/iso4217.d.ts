declare module 'iso4217' {
  type Currency = {
    Location: string;
    Currency: string;
    Code: string;
    Symbol: string;
    Fraction: string;
    CC: string;
    Obsolete: string;
    Num: string;
  }

  type Currencies = {
    [num: string]: Currency;
  }

  const currencies: Currencies
  export default currencies
}
