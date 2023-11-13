import { AggregateRoot } from '../../../../../../common/entities/aggregate-root';
import { SubjectRepository } from '../infra/persistence/subject.repository';
import { CourseRepository } from '../../../infra/persistence/course.repository';

export class Subject extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly course: CourseRepository,
  ) {
    super();
  }
  toPersistence(): SubjectRepository {
    return {
      course: this.course,
      name: this.name,
      ...this.toPersistenceRootTypes(),
    };
  }
}
