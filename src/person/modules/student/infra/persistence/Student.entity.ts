import { Collection, Entity, ManyToMany, ManyToOne } from '@mikro-orm/core';
import { ParentEntity } from './Parent.entity';
import { SectionEntity } from '../../../../../school/modules/course/modules/section/infra/persistence/Section.entity';
import { PersonEntity } from '../../../../infra/persistence/Person.entity';
import { AddressEntity } from '../../../../infra/persistence/Address.entity';
import { PersonRoles } from '../../../../domain/person';

@Entity()
export class StudentEntity extends PersonEntity {
  @ManyToOne({
    entity: () => SectionEntity,
    fieldName: 'sectionId',
    nullable: true,
  })
  section?: SectionEntity;

  @ManyToMany({
    entity: () => ParentEntity,
    joinColumn: 'studentId',
    inverseJoinColumn: 'parentId',
  })
  parents = new Collection<ParentEntity>(this);

  constructor(
    name: string,
    age: number,
    address: AddressEntity,
    sectionEntity: SectionEntity,
  ) {
    super(name, age, PersonRoles.STUDENT, address);
    this.section = sectionEntity;
  }
}
