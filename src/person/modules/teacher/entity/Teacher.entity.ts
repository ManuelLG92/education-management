import { Entity, ManyToOne } from '@mikro-orm/core';
import {
  Person,
  PersonEntityFields,
  PersonRoles,
} from '../../../entity/person';
import { School } from '../../../../school/entity/school';

export type TeacherEntityFields = {
  school: School;
} & PersonEntityFields;
@Entity()
export class TeacherEntity extends Person {
  @ManyToOne({
    entity: () => School,
    fieldName: 'schoolId',
    nullable: true,
  })
  school?: School;
  constructor({ school, ...data }: Omit<TeacherEntityFields, 'role'>) {
    super({ ...data, role: PersonRoles.TEACHER });
    this.school = school;
  }
}
