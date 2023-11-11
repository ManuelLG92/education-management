import { BaseRepository } from '../../../../../../../common/entities/base.repository';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CourseRepository } from '../../../../infra/persistence/course.repository';
import { SchoolRepository } from '../../../../../../infra/persistence/school.repository';

@Entity('season')
export class SeasonRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'date' })
  startAt: Date;

  @Column({ type: 'date' })
  endAt: Date;

  @ManyToMany(() => CourseRepository, (course) => course.seasons)
  @JoinTable()
  courses: ReadonlyArray<CourseRepository>;

  @ManyToOne(() => SchoolRepository, (school) => school.seasons)
  school: SchoolRepository;
}
