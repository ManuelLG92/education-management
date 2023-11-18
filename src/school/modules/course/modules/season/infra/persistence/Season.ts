import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Course } from '../../../../infra/persistence/Course';
import { School } from '../../../../../../infra/persistence/School';
import { Base } from '../../../../../../../common/entities/Base';

@Entity()
export class Season extends Base {
  @Property({ length: 100 })
  name!: string;

  @Property({ fieldName: 'startAt', columnType: 'date' })
  startAt!: Date;

  @Property({ fieldName: 'endAt', columnType: 'date' })
  endAt!: Date;

  @ManyToOne({ entity: () => School, fieldName: 'schoolId', nullable: true })
  school?: School;

  @ManyToMany({
    entity: () => Course,
    joinColumn: 'seasonId',
    inverseJoinColumn: 'courseId',
  })
  courses = new Collection<Course>(this);

  constructor(
    name: string,
    startAt: Date,
    endAt: Date,
    schoolId: School,
    coursesCourse: Collection<Course>,
  ) {
    super();
    this.name = name;
    this.startAt = startAt;
    this.endAt = endAt;
    this.school = schoolId;
    this.courses = coursesCourse;
  }
}
