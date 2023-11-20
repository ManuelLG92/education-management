import { Entity, ManyToOne } from '@mikro-orm/core';
import { PersonEntity } from '../../../../infra/persistence/Person.entity';
import { PersonRoles } from '../../../../domain/person';
import { AddressEntity } from '../../../../infra/persistence/Address.entity';
import { SchoolEntity } from '../../../../../school/infra/persistence/School.entity';

@Entity()
export class TeacherEntity extends PersonEntity {
  @ManyToOne({
    entity: () => SchoolEntity,
    fieldName: 'schoolId',
    nullable: true,
  })
  school?: SchoolEntity;
  constructor(
    name: string,
    age: number,
    address: AddressEntity,
    school: SchoolEntity,
  ) {
    super(name, age, PersonRoles.TEACHER, address);
    this.school = school;
  }
}
