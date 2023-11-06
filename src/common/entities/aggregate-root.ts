import { IdGenerator } from './id-generator';

export type IBase = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
};

export abstract class AggregateRoot {
  protected readonly id: string;
  protected readonly createdAt: Date;
  protected _updatedAt?: Date;
  protected constructor() {
    this.id = IdGenerator.generate();
    this.createdAt = new Date();
    this._updatedAt = null;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
  abstract toPersistence(): Record<string, unknown>;

  toPersistenceRootTypes() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
