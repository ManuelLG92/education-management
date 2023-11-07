import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SchoolRepository } from '../../../../../school/infra/persistence/school.repository';
import { PersonRepository } from '../../../../infra/persistence/person.repository';
import { IStudentOutput } from '../../domain/student';
import { PersonRoles } from '../../../../domain/person';
import { IParentOutput } from '../../domain/parent';
import { ParentRepository } from './parent.repository';

@Entity('student')
export class StudentRepository
  extends PersonRepository
  implements IStudentOutput
{
  @Column({ type: 'varchar', length: 100, nullable: true, default: 'backward' })
  level: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: PersonRoles.STUDENT,
  })
  role: PersonRoles;

  @Column()
  schoolId: string;

  @ManyToOne(() => SchoolRepository, (student) => student.students)
  @JoinColumn({ name: 'schoolId' })
  school: SchoolRepository;

  @ManyToMany(() => ParentRepository, (student) => student.students)
  @JoinTable()
  parents: ReadonlyArray<IParentOutput>;
}
