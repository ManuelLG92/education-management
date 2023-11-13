import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseRepository } from '../../../../../../../common/entities/base.repository';
import { StudentRepository } from '../../../../../../../person/modules/student/infra/persistence/student.repository';
import { CourseRepository } from '../../../../infra/persistence/course.repository';

@Entity('section')
export class SectionRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => StudentRepository, (student) => student.section)
  students: ReadonlyArray<StudentRepository>;

  @ManyToMany(() => CourseRepository, (course) => course.sections)
  @JoinTable()
  courses: ReadonlyArray<CourseRepository>;
}
