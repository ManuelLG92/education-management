import { IdGenerator } from './id-generator';

export type IBase = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
};

export abstract class AggregateRoot {
  private readonly _id: string;
  private readonly _createdAt: Date;
  protected _updatedAt?: Date;
  protected constructor(id?: string) {
    this._id = id ?? IdGenerator.generate();
    this._createdAt = new Date();
    this._updatedAt = null;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  toPersistenceRootTypes(): IBase {
    return {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
