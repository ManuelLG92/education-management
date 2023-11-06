export interface IAddress {
  street: string;
  state: string;
  city: string;
  cp: number;
  country: string;
}
export class Address {
  constructor(
    public readonly city: string,
    public readonly country: string,
    public readonly cp: number,
    public readonly state: string,
    public readonly street: string,
  ) {}

  toPersistence(): IAddress {
    return {
      city: this.city,
      country: this.country,
      cp: this.cp,
      state: this.state,
      street: this.street,
    };
  }
}
