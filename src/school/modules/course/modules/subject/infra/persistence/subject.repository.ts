import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseRepository } from '../../../../../../../common/entities/base.repository';
import { CourseRepository } from '../../../../infra/persistence/course.repository';

@Entity('subject')
export class SubjectRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => CourseRepository, (s) => s.subjects)
  course: CourseRepository;
}
