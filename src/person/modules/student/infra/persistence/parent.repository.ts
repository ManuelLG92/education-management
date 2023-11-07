import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { SchoolRepository } from '../../../../../school/infra/persistence/school.repository';
import { PersonRepository } from '../../../../infra/persistence/person.repository';
import { PersonRoles } from '../../../../domain/person';
import { StudentRepository } from './student.repository';
import { IParentOutput } from '../../domain/parent';

@Entity('parent')
export class ParentRepository
  extends PersonRepository
  implements IParentOutput
{
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: PersonRoles.PARENT,
  })
  role: PersonRoles;

  @Column()
  schoolId: string;

  @ManyToOne(() => SchoolRepository, (student) => student.students)
  @JoinColumn({ name: 'schoolId' })
  school: SchoolRepository;

  @ManyToMany(() => StudentRepository, (student) => student.parents)
  students: readonly StudentRepository[];
}
