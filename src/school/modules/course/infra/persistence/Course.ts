import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Base } from '../../../../../common/entities/Base';
import { Season } from '../../modules/season/infra/persistence/Season';
import { Section } from '../../modules/section/infra/persistence/Section';
import { OneToMany } from 'typeorm';
import { Subject } from '../../modules/subject/infra/persistence/Subject';

@Entity()
export class Course extends Base {
  @Property({ length: 100 })
  name!: string;

  @ManyToMany({
    entity: () => Season,
    joinColumn: 'courseId',
    inverseJoinColumn: 'seasonId',
  })
  seasons = new Collection<Season>(this);

  @ManyToMany({
    entity: () => Section,
    joinColumn: 'courseId',
    inverseJoinColumn: 'sectionId',
  })
  sections = new Collection<Section>(this);

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects = new Collection<Subject>(this);

  constructor(
    name: string,
    seasons: Collection<Season>,
    sections: Collection<Section>,
    subjects: Collection<Subject>,
  ) {
    super();
    this.name = name;
    this.seasons = seasons;
    this.sections = sections;
    this.subjects = subjects;
  }
}
