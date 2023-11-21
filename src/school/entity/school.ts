import {
  Collection,
  Embedded,
  Entity,
  Property,
  OneToMany,
} from '@mikro-orm/core';
import {
  AggregateRootEntity,
  ExistingAggregateRoot,
} from '../../common/entities/aggregate-root-entity';
import { Address } from '../../person/entity/address';
import { Season } from '../modules/course/modules/season/entity/season';
import { TeacherEntity } from '../../person/modules/teacher/entity/Teacher.entity';

export type SchoolEntityFields = {
  name: string;
  address: Address;
  seasons: Season[];
  teachers: TeacherEntity[];
} & ExistingAggregateRoot;
@Entity()
export class School extends AggregateRootEntity {
  @Property({ length: 100 })
  name!: string;

  @Embedded(() => Address)
  address!: Address;

  @OneToMany(() => Season, (season) => season.school)
  seasons = new Collection<Season>(this);

  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers = new Collection<TeacherEntity>(this);

  constructor({
    name,
    address,
    seasons,
    teachers,
    ...rest
  }: SchoolEntityFields) {
    super(rest);
    this.name = name;
    this.address = address;
    seasons.forEach((season) => {
      if (!this.seasons.contains(season)) {
        this.seasons.add(season);
      }
    });
    teachers.forEach((teacher) => {
      if (!this.teachers.contains(teacher)) {
        this.teachers.add(teacher);
      }
    });
  }
}
