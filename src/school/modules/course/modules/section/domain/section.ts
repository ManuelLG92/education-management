import { AggregateRoot } from '../../../../../../common/entities/aggregate-root';
import { Course } from '../../../infra/persistence/Course';
import { Student } from '../../../../../../person/modules/student/infra/persistence/Student';

export class Section extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly course: ReadonlyArray<Course>,
    public readonly students: ReadonlyArray<Student>,
  ) {
    super();
  }
}
