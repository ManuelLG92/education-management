import { AggregateRoot } from '../../common/entities/aggregate-root';

export abstract class Person extends AggregateRoot {
  protected constructor(protected _name: string) {
    super();
  }

  get name(): string {
    return this._name;
  }
}
