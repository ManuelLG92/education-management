import { AggregateRoot } from '../../common/entities/aggregate-root';

export class School extends AggregateRoot {
  constructor(public readonly name: string) {
    super();
  }
  toPersistence() {
    return {
      name: this.name,
      ...this.toPersistenceRootTypes(),
    };
  }
}
