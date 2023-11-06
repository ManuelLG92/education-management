import { AggregateRoot } from '../../../../common/entities/aggregate-root';

export class Course extends AggregateRoot {
  toPersistence(): Record<string, unknown> {
    return undefined;
  }
}
