import { IPerson, Person, PersonRoles } from '../../../domain/person';

type IBaseTeacher = {
  schoolId: string;
};

export type ITeacherInput = {
  person: Omit<IPerson, 'role'>;
} & IBaseTeacher;
export class Teacher extends Person {
  public readonly schoolId: string;
  constructor({ schoolId, person }: ITeacherInput) {
    super({ ...person, role: PersonRoles.TEACHER });
    this.schoolId = schoolId;
  }
}
