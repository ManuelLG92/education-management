import { BaseRepository } from '../../../common/entities/base.repository';
import { Column, Entity, OneToMany } from 'typeorm';
import { StudentRepository } from '../../../person/modules/student/infra/persistence/student.repository';
import { ParentRepository } from '../../../person/modules/student/infra/persistence/parent.repository';

@Entity('school')
export class SchoolRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => StudentRepository, (student) => student.school)
  students: StudentRepository[];

  @OneToMany(() => ParentRepository, (parent) => parent.school)
  parents: ParentRepository[];
}