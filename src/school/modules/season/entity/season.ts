import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Course } from '../modules/course/entity/course';
import {
  AggregateRootEntity,
  ExistingAggregateRoot,
} from '../../../../common/entities/aggregate-root-entity';
import { School } from '../../../entity/school';
import { BadRequestException } from '@nestjs/common';

export type SeasonEntityTypes = {
  name: string;
  startAt: Date;
  endAt: Date;
  school: School;
  courses: Course[];
} & ExistingAggregateRoot;
@Entity()
export class Season extends AggregateRootEntity {
  @Property({ length: 100 })
  name!: string;

  @Property({ fieldName: 'startAt', columnType: 'date' })
  startAt!: Date;

  @Property({ fieldName: 'endAt', columnType: 'date' })
  endAt!: Date;

  @ManyToOne({
    entity: () => School,
    fieldName: 'schoolId',
    nullable: true,
  })
  school?: School;

  @ManyToMany(() => Course, 'seasons', { owner: true })
  courses = new Collection<Course>(this);

  constructor({ name, startAt, endAt, school, ...rest }: SeasonEntityTypes) {
    super(rest);
    if (startAt.getTime() > endAt.getTime()) {
      throw new BadRequestException('startAt must be before endAt');
    }
    this.name = name;
    this.startAt = startAt;
    this.endAt = endAt;
    this.school = school;
  }
}
