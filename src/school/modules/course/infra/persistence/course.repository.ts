import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseRepository } from '../../../../../common/entities/base.repository';
import { SectionRepository } from '../../modules/section/infra/persistence/section.repository';
import { SubjectRepository } from '../../modules/subject/infra/persistence/subject.repository';
import { SeasonRepository } from '../../modules/season/infra/persistence/season.repository';

@Entity('course')
export class CourseRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => SectionRepository, (sections) => sections.courses)
  @JoinTable()
  sections: ReadonlyArray<SectionRepository>;

  @OneToMany(() => SubjectRepository, (s) => s.id)
  subjects: ReadonlyArray<SubjectRepository>;

  @ManyToMany(() => SeasonRepository, (c) => c.courses)
  seasons: SeasonRepository[];
}
