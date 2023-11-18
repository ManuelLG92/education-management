import { AggregateRoot } from '../../../../../../common/entities/aggregate-root';
import { Course } from '../../../infra/persistence/Course';

export class Subject extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly course: Course,
  ) {
    super();
  }
}
