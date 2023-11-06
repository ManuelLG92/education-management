import { AggregateRoot } from '../../../../common/entities/aggregate-root';

export class Subject extends AggregateRoot {
  toPersistence(): Record<string, unknown> {
    return undefined;
  }
}
