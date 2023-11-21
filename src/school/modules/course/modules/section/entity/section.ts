import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  OneToMany,
} from '@mikro-orm/core';
import { Course } from '../../../entity/course';
import {
  AggregateRootEntity,
  ExistingAggregateRoot,
} from '../../../../../../common/entities/aggregate-root-entity';
import { Student } from '../../../../../../person/modules/student/entity/student';

export type SectionEntityTypes = {
  name: string;
  courses: Course[];
  students: Student[];
} & ExistingAggregateRoot;
@Entity()
export class Section extends AggregateRootEntity {
  @Property({ length: 100 })
  name!: string;

  @ManyToMany(() => Course, (course) => course.sections)
  courses = new Collection<Course>(this);

  @OneToMany(() => Student, (course) => course.section)
  students = new Collection<Student>(this);

  constructor({ name, students, courses, ...rest }: SectionEntityTypes) {
    super(rest);
    this.name = name;
    students.forEach((student) => {
      if (!this.students.contains(student)) {
        this.students.add(student);
      }
    });
    courses.forEach((course) => {
      if (!this.courses.contains(course)) {
        this.courses.add(course);
      }
    });
  }
}
