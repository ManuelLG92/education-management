import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRepository } from '../../../common/entities/base.repository';
import { SchoolRepository } from '../../../school/infra/persistence/school.repository';

@Entity()
export class StudentRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 100, nullable: true, default: 'backward' })
  level: string;

  @Column()
  schoolId: string;

  @ManyToOne(() => SchoolRepository, (student) => student.students)
  @JoinColumn({ name: 'schoolId' })
  school: SchoolRepository;
}
