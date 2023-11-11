import {
  AggregateRoot,
  IBase,
} from '../../../../../../common/entities/aggregate-root';
import { Student } from '../../../../../../person/modules/student/domain/student';
import { Course } from '../../../domain/course';

type ISection = {
  name: string;
  course: ReadonlyArray<Course>;
  students: ReadonlyArray<Student>;
};
export class Section extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly course: ReadonlyArray<Course>,
    public readonly students: ReadonlyArray<Student>,
  ) {
    super();
  }
  toPersistence(): IBase & ISection {
    return {
      name: this.name,
      students: this.students,
      course: this.course,
      ...this.toPersistenceRootTypes(),
    };
  }
}
