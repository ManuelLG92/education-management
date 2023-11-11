import { AggregateRoot } from '../../common/entities/aggregate-root';
import { Address } from '../../person/domain/address';

export class School extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly address: Address,
  ) {
    super();
  }
  toPersistence() {
    return {
      name: this.name,
      address: this.address.toPersistence(),
      ...this.toPersistenceRootTypes(),
    };
  }
}
