import { AggregateRoot } from '../../../../../../common/entities/aggregate-root';
import { SeasonRepository } from '../infra/persistence/season.repository';
import { School } from '../../../../../domain/school';
import { CourseRepository } from '../../../infra/persistence/course.repository';

export class Season extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly school: School,
    public readonly startAt: Date,
    public readonly endAt: Date,
    public readonly courses: ReadonlyArray<CourseRepository>,
  ) {
    super();
  }
  toPersistence(): SeasonRepository {
    return {
      name: this.name,
      school: this.school.toPersistence(),
      startAt: this.startAt,
      endAt: this.endAt,
      courses: this.courses,
      ...this.toPersistenceRootTypes(),
    };
  }
}
