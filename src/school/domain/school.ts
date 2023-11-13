import { AggregateRoot } from '../../common/entities/aggregate-root';
import { Address } from '../../person/domain/address';
import { SchoolRepository } from '../infra/persistence/school.repository';
import { Season } from '../modules/course/modules/season/domain/season';

export class School extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly address: Address,
    public readonly seasons: Array<Season>,
  ) {
    super();
  }
  toPersistence(): SchoolRepository {
    return {
      name: this.name,
      address: this.address.toPersistence(),
      seasons: this.seasons.map((it) => it.toPersistence()),
      ...this.toPersistenceRootTypes(),
    };
  }
}
