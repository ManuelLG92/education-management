import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  OneToMany,
} from '@mikro-orm/core';
import { CourseEntity } from '../../../../infra/persistence/Course.entity';
import { Base } from '../../../../../../../common/entities/Base';
// import { OneToMany } from 'typeorm';
// import { SubjectEntity } from '../../../subject/infra/persistence/Subject.entity';
import { StudentEntity } from '../../../../../../../person/modules/student/infra/persistence/Student.entity';

@Entity()
export class SectionEntity extends Base {
  @Property({ length: 100 })
  name!: string;

  @ManyToMany(() => CourseEntity, (course) => course.sections)
  courses = new Collection<CourseEntity>(this);

  @OneToMany(() => StudentEntity, (course) => course.section)
  students = new Collection<StudentEntity>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
