import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { CourseEntity } from '../../../../infra/persistence/Course.entity';
import { SchoolEntity } from '../../../../../../infra/persistence/School.entity';
import { Base } from '../../../../../../../common/entities/Base';

@Entity()
export class SeasonEntity extends Base {
  @Property({ length: 100 })
  name!: string;

  @Property({ fieldName: 'startAt', columnType: 'date' })
  startAt!: Date;

  @Property({ fieldName: 'endAt', columnType: 'date' })
  endAt!: Date;

  @ManyToOne({
    entity: () => SchoolEntity,
    fieldName: 'schoolId',
    nullable: true,
  })
  school?: SchoolEntity;

  @ManyToMany(() => CourseEntity, 'seasons', { owner: true })
  courses = new Collection<CourseEntity>(this);

  constructor(name: string, startAt: Date, endAt: Date, school: SchoolEntity) {
    super();
    this.name = name;
    this.startAt = startAt;
    this.endAt = endAt;
    this.school = school;
  }
}
