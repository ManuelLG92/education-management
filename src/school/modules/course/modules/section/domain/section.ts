import { AggregateRoot } from '../../../../../../common/entities/aggregate-root';
import { CourseEntity } from '../../../infra/persistence/Course.entity';
import { StudentEntity } from '../../../../../../person/modules/student/infra/persistence/Student.entity';

export class Section extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly course: ReadonlyArray<CourseEntity>,
    public readonly students: ReadonlyArray<StudentEntity>,
  ) {
    super();
  }
}
