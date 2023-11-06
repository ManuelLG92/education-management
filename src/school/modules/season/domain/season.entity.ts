import { AggregateRoot } from '../../../../common/entities/aggregate-root';

export class Season extends AggregateRoot {
  toPersistence(): Record<string, unknown> {
    return undefined;
  }
}
