import { Embedded, Property } from '@mikro-orm/core';
import { Base } from '../../../common/entities/Base';
import { AddressEntity } from './Address.entity';
import { PersonRoles } from '../../domain/person';

export class PersonEntity extends Base {
  @Property({ length: 100 })
  name!: string;

  @Property()
  age!: number;

  @Property({ length: 100, nullable: false })
  role: string;

  @Embedded(() => AddressEntity)
  address!: AddressEntity;

  constructor(
    name: string,
    age: number,
    role: PersonRoles,
    address: AddressEntity,
  ) {
    super();
    this.name = name;
    this.age = age;
    this.role = role;
    this.address = address;
  }
}
