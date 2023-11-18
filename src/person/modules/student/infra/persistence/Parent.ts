import { Entity } from '@mikro-orm/core';
import { Person } from '../../../../infra/persistence/Person';
import { PersonRoles } from '../../../../domain/person';
import { Address } from '../../../../infra/persistence/Address';

@Entity()
export class Parent extends Person {
  constructor(name: string, age: number, address: Address) {
    super(name, age, PersonRoles.PARENT, address);
  }
}
