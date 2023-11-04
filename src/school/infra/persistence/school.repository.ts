import { BaseRepository } from '../../../common/entities/base.repository';
import { Column, Entity, OneToMany } from 'typeorm';
import { StudentRepository } from '../../../student/infra/persistence/student.repository';

@Entity()
export class SchoolRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => StudentRepository, (student) => student.school)
  students: StudentRepository[];
}
