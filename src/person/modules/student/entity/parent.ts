import { Entity } from '@mikro-orm/core';
import {
  Person,
  PersonEntityFields,
  PersonRoles,
} from '../../../entity/person';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class Parent extends Person {
  constructor(data: Omit<PersonEntityFields, 'role'>) {
    super({ ...data, role: PersonRoles.PARENT });
    this.ensureMajor();
  }

  private ensureMajor() {
    if (this.age < 18) {
      throw new BadRequestException(`A parent should be major`);
    }
  }
}
