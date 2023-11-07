import {
  IPerson,
  IPersonOut,
  Person,
  PersonRoles,
} from '../../../domain/person';
import { IBase } from '../../../../common/entities/aggregate-root';

type IBaseTeacher = {
  schoolId: string;
};
export type ITeacherOutput = IBaseTeacher & IPersonOut & IBase;

export type ITeacherInput = {
  person: Omit<IPerson, 'role'>;
} & IBaseTeacher;
export class Teacher extends Person {
  public readonly schoolId: string;
  protected readonly role: PersonRoles;
  constructor({ schoolId, person }: ITeacherInput) {
    super({ ...person, role: PersonRoles.TEACHER });
    this.schoolId = schoolId;
  }
  toPersistence(): ITeacherOutput {
    return {
      age: this.age,
      name: this.name,
      role: this.role,
      address: this.address.toPersistence(),
      schoolId: this.schoolId,
      ...this.toPersistenceRootTypes(),
    };
  }
}
