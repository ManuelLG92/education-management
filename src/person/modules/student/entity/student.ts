import { Collection, Entity, ManyToMany, ManyToOne } from '@mikro-orm/core';
import { Parent } from './parent';
import { Section } from '../../../../school/modules/season/modules/course/modules/section/entity/section';
import {
  Person,
  PersonEntityFields,
  PersonRoles,
} from '../../../entity/person';
import { BadRequestException } from '@nestjs/common';

export type StudentEntityField = {
  section: Section;
  parents: Parent[];
} & PersonEntityFields;
@Entity()
export class Student extends Person {
  private readonly AGE_THRESHOLD = 18;
  @ManyToOne({
    entity: () => Section,
    fieldName: 'sectionId',
    nullable: true,
  })
  section?: Section;

  @ManyToMany({
    entity: () => Parent,
    joinColumn: 'studentId',
    inverseJoinColumn: 'parentId',
  })
  parents = new Collection<Parent>(this);

  constructor({ section, parents, ...rest }: Omit<StudentEntityField, 'role'>) {
    super({ ...rest, role: PersonRoles.STUDENT });
    this.section = section;
    parents.forEach((parent) => {
      if (!this.parents.contains(parent)) {
        this.parents.add(parent);
      }
    });
    this.ensuredParentIfMinor();
  }

  private ensuredParentIfMinor() {
    if (this.age < this.AGE_THRESHOLD && !this.parents.length) {
      throw new BadRequestException(
        `At least 1 parent is needed when student is minor of ${this.AGE_THRESHOLD}.`,
      );
    }
  }
}
