import { PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';
export class Base {
  @PrimaryKey({ length: 50, default: crypto.randomUUID() })
  id!: string;

  @Property({
    fieldName: 'createdAt',
    columnType: 'date',
    default: new Date().toISOString(),
  })
  createdAt!: Date;

  @Property({ fieldName: 'updatedAt', columnType: 'date', nullable: true })
  updatedAt?: Date;

  constructor({
    id,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  } = {}) {
    this.id = id ?? crypto.randomUUID();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
