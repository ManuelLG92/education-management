import { AggregateRoot } from '../../common/entities/aggregate-root';

export class Template extends AggregateRoot {
  toPersistence(): Record<string, unknown> {
    return undefined;
  }
}
