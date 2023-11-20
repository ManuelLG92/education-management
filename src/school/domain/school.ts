import { AggregateRoot } from '../../common/entities/aggregate-root';
import { Season } from '../modules/course/modules/season/domain/season';
import { AddressEntity } from '../../person/infra/persistence/Address.entity';

export class School extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly address: AddressEntity,
    public readonly seasons: Array<Season>,
  ) {
    super();
  }
}
