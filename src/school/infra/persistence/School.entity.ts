import {
  Collection,
  Embedded,
  Entity,
  Property,
  OneToMany,
} from '@mikro-orm/core';
import { Base } from '../../../common/entities/Base';
import { AddressEntity } from '../../../person/infra/persistence/Address.entity';
import { SeasonEntity } from '../../modules/course/modules/season/infra/persistence/Season.entity';
import { TeacherEntity } from '../../../person/modules/teacher/infra/persistence/Teacher.entity';

@Entity()
export class SchoolEntity extends Base {
  @Property({ length: 100 })
  name!: string;

  @Embedded(() => AddressEntity)
  address!: AddressEntity;

  @OneToMany(() => SeasonEntity, (season) => season.school)
  seasons = new Collection<SeasonEntity>(this);

  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers = new Collection<TeacherEntity>(this);

  constructor(name: string, address: AddressEntity) {
    super();
    this.name = name;
    this.address = address;
  }
}
