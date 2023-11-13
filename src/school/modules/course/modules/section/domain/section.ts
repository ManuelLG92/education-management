import { AggregateRoot } from '../../../../../../common/entities/aggregate-root';
import { Student } from '../../../../../../person/modules/student/domain/student';
import { SectionRepository } from '../infra/persistence/section.repository';
import { CourseRepository } from '../../../infra/persistence/course.repository';

export class Section extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly course: ReadonlyArray<CourseRepository>,
    public readonly students: ReadonlyArray<Student>,
  ) {
    super();
  }
  toPersistence(): SectionRepository {
    return {
      name: this.name,
      students: this.students.map((item) => item.toPersistence()),
      courses: this.course,
      ...this.toPersistenceRootTypes(),
    };
  }
}
