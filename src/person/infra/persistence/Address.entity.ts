import { Embeddable, Property } from '@mikro-orm/core';

export interface IAddress {
  street: string;
  state: string;
  city: string;
  postalCode: string;
  country: string;
}
@Embeddable()
export class AddressEntity implements IAddress {
  @Property()
  city!: string;

  @Property()
  country!: string;

  @Property()
  postalCode!: string;

  @Property()
  state!: string;

  @Property()
  street!: string;

  constructor(
    city: string,
    country: string,
    postalCode: string,
    state: string,
    street: string,
  ) {
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.state = state;
    this.street = street;
  }
}
