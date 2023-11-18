import { PrimaryKey, Property } from '@mikro-orm/core';
export class Base {
  @PrimaryKey({ length: 50 })
  id!: string;

  @Property({ fieldName: 'createdAt', columnType: 'date' })
  createdAt!: Date;

  @Property({ fieldName: 'updatedAt', columnType: 'date', nullable: true })
  updatedAt?: Date;
}
