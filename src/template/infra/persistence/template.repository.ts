import { AggregateRootEntity } from '../../../common/entities/aggregate-root-entity';
import { Entity } from '@mikro-orm/core';

@Entity()
export class TemplateRepository extends AggregateRootEntity {}
