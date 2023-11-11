import {
  IPerson,
  IPersonOut,
  Person,
  PersonRoles,
} from '../../../domain/person';
import { IBase } from '../../../../common/entities/aggregate-root';
import { BadRequestException } from '@nestjs/common';

export type IParentOutput = IPersonOut & IBase;
export type IParentInput = Omit<IPerson, 'role'>;

export class Parent extends Person {
  constructor(person: IParentInput) {
    super({ ...person, role: PersonRoles.PARENT });
    this.ensureMajor();
  }

  private ensureMajor() {
    if (this.age < 18) {
      throw new BadRequestException(`A parent should be major`);
    }
  }
}
