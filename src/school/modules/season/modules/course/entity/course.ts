import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  OneToMany,
} from '@mikro-orm/core';
import {
  AggregateRootEntity,
  ExistingAggregateRoot,
} from '../../../../../../common/entities/aggregate-root-entity';
import { Season } from '../../../entity/season';
import { Section } from '../modules/section/entity/section';
import { Subject } from '../modules/subject/entity/subject';

type CourseEntityFields = {
  name: string;
  seasons: Season[];
  sections: Section[];
  subjects: Subject[];
} & ExistingAggregateRoot;
@Entity()
export class Course extends AggregateRootEntity {
  @Property({ length: 100 })
  name!: string;

  @ManyToMany(() => Season, (season) => season.courses)
  seasons = new Collection<Season>(this);

  @ManyToMany(() => Section, 'courses', { owner: true })
  sections = new Collection<Section>(this);

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects = new Collection<Subject>(this);

  constructor({
    name,
    seasons,
    subjects,
    sections,
    ...rest
  }: CourseEntityFields) {
    super(rest);
    this.name = name;
    seasons.forEach((season) => {
      if (!this.seasons.contains(season)) {
        this.seasons.add(season);
      }
    });
    subjects.forEach((subject) => {
      if (!this.subjects.contains(subject)) {
        this.subjects.add(subject);
      }
    });
    sections.forEach((section) => {
      if (!this.sections.contains(section)) {
        this.sections.add(section);
      }
    });
  }
}
