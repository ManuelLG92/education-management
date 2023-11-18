import {
  IPerson,
  IPersonOut,
  Person,
  PersonRoles,
} from '../../../domain/person';
import { IBase } from '../../../../common/entities/aggregate-root';
import { BadRequestException } from '@nestjs/common';
import { IParentInput, Parent } from './parent';
import { Section } from '../../../../school/modules/course/modules/section/infra/persistence/Section';

type IBaseStudent = {
  section: Section;
};
export type IStudentOutput = {
  parents: ReadonlyArray<IPersonOut>;
  section: Section;
} & IBaseStudent &
  IPersonOut &
  IBase;

export type IStudentInput = {
  parents: Array<IParentInput>;
} & Omit<IPerson, 'role'> &
  IBaseStudent;

export class Student extends Person {
  public readonly section: Section;
  protected readonly role: PersonRoles;
  protected readonly parents: Array<Parent>;
  constructor({ parents, ...rest }: IStudentInput) {
    super({ ...rest, role: PersonRoles.STUDENT });
    this.section = rest.section;
    this.parents = parents.map((item) => new Parent(item));
    this.ensuredParentIfMinor();
  }

  private ensuredParentIfMinor() {
    if (this.age < 18 && !this.parents.length) {
      throw new BadRequestException(
        `At least 1 parent is needed when student is minor.`,
      );
    }
  }
}
