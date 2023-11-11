import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { PersonRepository } from '../../../../infra/persistence/person.repository';
import { IStudentOutput } from '../../domain/student';
import { PersonRoles } from '../../../../domain/person';
import { IParentOutput } from '../../domain/parent';
import { ParentRepository } from './parent.repository';
import { SectionRepository } from '../../../../../school/modules/course/modules/section/infra/persistence/section.repository';

@Entity('student')
export class StudentRepository
  extends PersonRepository
  implements IStudentOutput
{
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: PersonRoles.STUDENT,
  })
  role: PersonRoles;

  @ManyToOne(() => SectionRepository, (section) => section.students)
  section: SectionRepository;

  @ManyToMany(() => ParentRepository)
  @JoinTable()
  parents: ReadonlyArray<IParentOutput>;
}
