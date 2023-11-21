import { Embedded, Property } from '@mikro-orm/core';
import {
  AggregateRootEntity,
  ExistingAggregateRoot,
} from '../../common/entities/aggregate-root-entity';
import { Address } from './address';

export enum PersonRoles {
  STUDENT = 'student',
  TEACHER = 'teacher',
  PARENT = 'parent',
}

export type PersonEntityFields = {
  name: string;
  age: number;
  role: PersonRoles;
  address: Address;
} & ExistingAggregateRoot;
export class Person extends AggregateRootEntity {
  @Property({ length: 100 })
  name!: string;

  @Property()
  age!: number;

  @Property({ length: 100, nullable: false })
  role: PersonRoles;

  @Embedded(() => Address)
  address!: Address;

  constructor({
    id,
    name,
    age,
    role,
    address,
    createdAt,
    updatedAt,
  }: PersonEntityFields) {
    super({ id, createdAt, updatedAt });
    this.name = name;
    this.age = age;
    this.role = role;
    this.address = address;
  }
}
