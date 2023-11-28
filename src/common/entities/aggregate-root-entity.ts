import { PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';
import { IdGenerator } from './id-generator';

export type ExistingAggregateRoot = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export class AggregateRootEntity {
  @PrimaryKey({ length: 50, default: crypto.randomUUID() })
  id!: string;

  @Property({
    fieldName: 'createdAt',
    columnType: 'TIMESTAMP',
    default: new Date().toISOString(),
  })
  createdAt!: Date;

  @Property({ fieldName: 'updatedAt', columnType: 'TIMESTAMP', nullable: true })
  updatedAt?: Date;

  constructor({ id, createdAt, updatedAt }: ExistingAggregateRoot) {
    this.id = id ?? IdGenerator.generate();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
