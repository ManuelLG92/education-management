import { Collection, Entity, ManyToMany, ManyToOne } from '@mikro-orm/core';
import { Parent } from './Parent';
import { Section } from '../../../../../school/modules/course/modules/section/infra/persistence/Section';
import { Person } from '../../../../infra/persistence/Person';
import { Address } from '../../../../infra/persistence/Address';
import { PersonRoles } from '../../../../domain/person';

@Entity()
export class Student extends Person {
  @ManyToOne({ entity: () => Section, fieldName: 'sectionId', nullable: true })
  section?: Section;

  @ManyToMany({
    entity: () => Parent,
    joinColumn: 'studentId',
    inverseJoinColumn: 'parentId',
  })
  parents = new Collection<Parent>(this);

  constructor(
    name: string,
    age: number,
    address: Address,
    sectionId: Section,
    parentsParent: Collection<Parent>,
  ) {
    super(name, age, PersonRoles.STUDENT, address);
    this.section = sectionId;
    this.parents = parentsParent;
  }
}
