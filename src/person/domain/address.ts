export interface IAddress {
  street: string;
  state: string;
  city: string;
  cp: string;
  country: string;
}
export class Address {
  constructor(
    public readonly city: string,
    public readonly country: string,
    public readonly cp: string,
    public readonly state: string,
    public readonly street: string,
  ) {}
}
