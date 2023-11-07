import {
  IPerson,
  IPersonOut,
  Person,
  PersonRoles,
} from '../../../domain/person';
import { IBase } from '../../../../common/entities/aggregate-root';
import { BadRequestException } from '@nestjs/common';

type IBaseParent = {
  schoolId: string;
};
export type IParentOutput = IBaseParent & IPersonOut & IBase;

export type IParentInput = {
  person: Omit<IPerson, 'role'>;
} & IBaseParent;

export class Parent extends Person {
  public readonly schoolId: string;
  protected readonly role: PersonRoles;
  constructor({ schoolId, person }: IParentInput) {
    super({ ...person, role: PersonRoles.PARENT });
    this.schoolId = schoolId;
    this.ensureMajor();
  }

  toPersistence(): IParentOutput {
    return {
      name: this.name,
      age: this.age,
      role: this.role,
      address: this.address.toPersistence(),
      schoolId: this.schoolId,
      ...this.toPersistenceRootTypes(),
    } as const;
  }

  private ensureMajor() {
    if (this.age < 18) {
      throw new BadRequestException(`A parent should be major`);
    }
  }
}
