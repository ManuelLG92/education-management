import { AggregateRoot } from '../../../../../../common/entities/aggregate-root';
import { CourseEntity } from '../../../infra/persistence/Course.entity';

export class Subject extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly course: CourseEntity,
  ) {
    super();
  }
}
