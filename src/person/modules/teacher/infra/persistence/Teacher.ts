import { Entity } from '@mikro-orm/core';
import { Person } from '../../../../infra/persistence/Person';

@Entity()
export class Teacher extends Person {}
