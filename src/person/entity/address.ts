import { Embeddable, Property } from '@mikro-orm/core';

export type AddressEntityFields = {
  street: string;
  state: string;
  city: string;
  postalCode: string;
  country: string;
};
@Embeddable()
export class Address implements AddressEntityFields {
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

  constructor({
    city,
    country,
    postalCode,
    state,
    street,
  }: AddressEntityFields) {
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.state = state;
    this.street = street;
  }
}
