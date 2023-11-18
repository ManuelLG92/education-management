import { Embedded, Entity, Property } from '@mikro-orm/core';
import { Base } from '../../../common/entities/Base';
import { Address } from './Address';
import { PersonRoles } from '../../domain/person';

@Entity()
export class Person extends Base {
  @Property({ length: 100 })
  name!: string;

  @Property()
  age!: number;

  @Property({ length: 100, nullable: false })
  role: string;

  @Embedded(() => Address)
  address!: Address;

  constructor(name: string, age: number, role: PersonRoles, address: Address) {
    super();
    this.name = name;
    this.age = age;
    this.role = role;
    this.address = address;
  }
}
