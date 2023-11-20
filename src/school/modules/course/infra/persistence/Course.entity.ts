import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  OneToMany,
} from '@mikro-orm/core';
import { Base } from '../../../../../common/entities/Base';
import { SeasonEntity } from '../../modules/season/infra/persistence/Season.entity';
import { SectionEntity } from '../../modules/section/infra/persistence/Section.entity';
// import { OneToMany } from 'typeorm';
import { SubjectEntity } from '../../modules/subject/infra/persistence/Subject.entity';

@Entity()
export class CourseEntity extends Base {
  @Property({ length: 100 })
  name!: string;

  @ManyToMany(() => SeasonEntity, (season) => season.courses)
  seasons = new Collection<SeasonEntity>(this);

  @ManyToMany(() => SectionEntity, 'courses', { owner: true })
  sections = new Collection<SectionEntity>(this);

  @OneToMany(() => SubjectEntity, (subject) => subject.course)
  subjects = new Collection<SubjectEntity>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
