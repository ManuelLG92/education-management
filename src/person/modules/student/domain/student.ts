import {
  IPerson,
  IPersonOut,
  Person,
  PersonRoles,
} from '../../../domain/person';
import { IBase } from '../../../../common/entities/aggregate-root';
import { BadRequestException } from '@nestjs/common';
import { IParentInput, IParentOutput, Parent } from './parent';

type IBaseStudent = {
  schoolId: string;
  level: string;
};
export type IStudentOutput = {
  parents: ReadonlyArray<IParentOutput>;
} & IBaseStudent &
  IPersonOut &
  IBase;

export type IStudentInput = {
  person: Omit<IPerson, 'role'>;
  parents: ReadonlyArray<IParentInput>;
} & IBaseStudent;

export class Student extends Person {
  public readonly level: string;
  public readonly schoolId: string;
  protected readonly role: PersonRoles;
  protected readonly parents: ReadonlyArray<Parent>;
  constructor({ level, schoolId, person, parents }: IStudentInput) {
    super({ ...person, role: PersonRoles.STUDENT });
    this.schoolId = schoolId;
    this.level = level;
    this.parents = parents.map((item) => new Parent(item));
    this.ensuredParentIfMinor();
  }

  toPersistence(): IStudentOutput {
    const parents: ReadonlyArray<IParentOutput> = this.parents.map((parent) =>
      parent.toPersistence(),
    );
    return {
      name: this.name,
      age: this.age,
      role: this.role,
      address: this.address.toPersistence(),
      level: this.level,
      schoolId: this.schoolId,
      parents,
      ...this.toPersistenceRootTypes(),
    };
  }

  private ensuredParentIfMinor() {
    if (this.age < 18 && !this.parents.length) {
      throw new BadRequestException(
        `At least 1 parent is needed when student is minor.`,
      );
    }
  }
}
