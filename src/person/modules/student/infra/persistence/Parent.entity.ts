import { Entity } from '@mikro-orm/core';
import { PersonEntity } from '../../../../infra/persistence/Person.entity';
import { PersonRoles } from '../../../../domain/person';
import { AddressEntity } from '../../../../infra/persistence/Address.entity';

@Entity()
export class ParentEntity extends PersonEntity {
  constructor(name: string, age: number, address: AddressEntity) {
    super(name, age, PersonRoles.PARENT, address);
  }
}
