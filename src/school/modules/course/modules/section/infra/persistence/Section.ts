import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Course } from '../../../../infra/persistence/Course';
import { Base } from '../../../../../../../common/entities/Base';
import { OneToMany } from 'typeorm';
import { Subject } from '../../../subject/infra/persistence/Subject';
import { Student } from '../../../../../../../person/modules/student/infra/persistence/Student';

@Entity()
export class Section extends Base {
  @Property({ length: 100 })
  name!: string;

  @ManyToMany({
    entity: () => Course,
    joinColumn: 'sectionId',
    inverseJoinColumn: 'courseId',
  })
  course = new Collection<Course>(this);

  @OneToMany(() => Student, (course) => course.section)
  students = new Collection<Student>(this);

  constructor(name: string, courseCollection: Collection<Course>) {
    super();
    this.name = name;
    this.course = courseCollection;
  }
}
