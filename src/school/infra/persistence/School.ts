import { Collection, Embedded, Entity, Property } from '@mikro-orm/core';
import { Base } from '../../../common/entities/Base';
import { Address } from '../../../person/infra/persistence/Address';
import { OneToMany } from 'typeorm';
import { Subject } from '../../modules/course/modules/subject/infra/persistence/Subject';
import { Season } from '../../modules/course/modules/season/infra/persistence/Season';

@Entity()
export class School extends Base {
  @Property({ length: 100 })
  name!: string;

  @Embedded(() => Address)
  address!: Address;

  @OneToMany(() => Season, (season) => season.courses)
  seasons = new Collection<Season>(this);

  constructor(name: string, address: Address) {
    super();
    this.name = name;
    this.address = address;
  }
}
