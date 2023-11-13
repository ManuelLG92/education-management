import {
  IPerson,
  IPersonOut,
  Person,
  PersonRoles,
} from '../../../domain/person';
import { IBase } from '../../../../common/entities/aggregate-root';
import { BadRequestException } from '@nestjs/common';
import { IParentInput, Parent } from './parent';
import { SectionRepository } from '../../../../school/modules/course/modules/section/infra/persistence/section.repository';
import { ParentRepository } from '../infra/persistence/parent.repository';
import { StudentRepository } from '../infra/persistence/student.repository';

type IBaseStudent = {
  section: SectionRepository;
};
export type IStudentOutput = {
  parents: ReadonlyArray<IPersonOut>;
  section: SectionRepository;
} & IBaseStudent &
  IPersonOut &
  IBase;

export type IStudentInput = {
  parents: Array<IParentInput>;
} & Omit<IPerson, 'role'> &
  IBaseStudent;

export class Student extends Person {
  public readonly section: SectionRepository;
  protected readonly role: PersonRoles;
  protected readonly parents: Array<Parent>;
  constructor({ parents, ...rest }: IStudentInput) {
    super({ ...rest, role: PersonRoles.STUDENT });
    this.section = rest.section;
    this.parents = parents.map((item) => new Parent(item));
    this.ensuredParentIfMinor();
  }

  toPersistence(): StudentRepository {
    const parents: Array<ParentRepository> = this.parents.map((parent) =>
      parent.toPersistence(),
    );
    return {
      name: this.name,
      age: this.age,
      role: this.role,
      address: this.address.toPersistence(),
      section: this.section,
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
