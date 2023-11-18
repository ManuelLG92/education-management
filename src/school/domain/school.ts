import { AggregateRoot } from '../../common/entities/aggregate-root';
import { Season } from '../modules/course/modules/season/domain/season';
import { Address } from '../../person/infra/persistence/Address';

export class School extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly address: Address,
    public readonly seasons: Array<Season>,
  ) {
    super();
  }
}
