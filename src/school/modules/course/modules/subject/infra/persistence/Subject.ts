import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Course } from '../../../../infra/persistence/Course';
import { Base } from '../../../../../../../common/entities/Base';

@Entity()
export class Subject extends Base {
  @Property({ length: 100 })
  name!: string;

  @ManyToOne({ entity: () => Course, fieldName: 'courseId', nullable: true })
  course?: Course;

  constructor(name: string, courseId: Course) {
    super();
    this.name = name;
    this.course = courseId;
  }
}
