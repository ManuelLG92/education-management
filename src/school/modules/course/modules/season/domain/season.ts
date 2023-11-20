import { AggregateRoot } from '../../../../../../common/entities/aggregate-root';
import { School } from '../../../../../domain/school';
import { CourseEntity } from '../../../infra/persistence/Course.entity';

export class Season extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly school: School,
    public readonly startAt: Date,
    public readonly endAt: Date,
    public readonly courses: ReadonlyArray<CourseEntity>,
  ) {
    super();
  }
}
