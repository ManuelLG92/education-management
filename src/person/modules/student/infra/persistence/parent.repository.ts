import { Entity, Column } from 'typeorm';
import { PersonRepository } from '../../../../infra/persistence/person.repository';
import { PersonRoles } from '../../../../domain/person';
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
}
