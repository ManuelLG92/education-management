import { AggregateRoot } from '../../common/entities/aggregate-root';
import { IAddress } from '../infra/persistence/Address.entity';
import { Address } from './address';

export type IPersonOut = {
  name: string;
  address: IAddress;
  age: number;
  role: PersonRoles;
};
export type IPerson = {
  name: string;
  address: IAddress;
  age: number;
  role: PersonRoles;
};

export enum PersonRoles {
  STUDENT = 'student',
  TEACHER = 'teacher',
  PARENT = 'parent',
}
export abstract class Person extends AggregateRoot {
  protected readonly address: Address;
  protected readonly age: number;
  protected name: string;
  protected role: PersonRoles;
  protected constructor({ address, age, name, role }: IPerson) {
    const { city, country, postalCode, state, street } = address;
    super();
    this.address = new Address(city, country, postalCode, state, street);
    this.age = age;
    this.name = name;
    this.role = role;
  }
}
