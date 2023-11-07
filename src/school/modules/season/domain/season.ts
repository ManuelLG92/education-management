import { AggregateRoot } from '../../../../common/entities/aggregate-root';
import { Course } from '../../course/domain/course';

export class Season extends AggregateRoot {
  constructor(
    public readonly startAt: Date,
    public readonly endAt: Date,
    public readonly courses: ReadonlyArray<Course>,
  ) {
    super();
  }
  toPersistence(): Record<string, unknown> {
    return {
      start_at: this.startAt,
      endAt: this.endAt,
      courses: this.courses,
      ...this.toPersistenceRootTypes(),
    };
  }
}
