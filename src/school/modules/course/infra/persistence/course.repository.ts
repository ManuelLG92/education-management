import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseRepository } from '../../../../../common/entities/base.repository';
import { SectionRepository } from '../../modules/section/infra/persistence/section.repository';
import { SubjectRepository } from '../../modules/subject/infra/persistence/subject.repository';
import { SeasonRepository } from '../../modules/season/infra/persistence/season.repository';

@Entity('course-old')
export class CourseRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => SectionRepository, (s) => s.courses)
  sections: ReadonlyArray<SectionRepository>;

  @OneToMany(() => SubjectRepository, (s) => s.course)
  subjects: ReadonlyArray<SubjectRepository>;

  @ManyToMany(() => SeasonRepository, (x) => x.courses)
  seasons: SeasonRepository[];
}
