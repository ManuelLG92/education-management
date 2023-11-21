import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Course } from '../../../entity/course';
import {
  AggregateRootEntity,
  ExistingAggregateRoot,
} from '../../../../../../common/entities/aggregate-root-entity';

export type SubjectEntityTypes = {
  name: string;
  course: Course;
} & ExistingAggregateRoot;
@Entity()
export class Subject extends AggregateRootEntity {
  @Property({ length: 100 })
  name!: string;

  @ManyToOne({
    entity: () => Course,
    fieldName: 'courseId',
    nullable: true,
  })
  course?: Course;

  constructor({ name, course, ...rest }: SubjectEntityTypes) {
    super(rest);
    this.name = name;
    this.course = course;
  }
}
