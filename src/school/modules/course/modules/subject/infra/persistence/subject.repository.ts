import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseRepository } from '../../../../../../../common/entities/base.repository';
import { Course } from '../../../../infra/persistence/Course';

@Entity('subject-old')
export class SubjectRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  // @ManyToOne(() => Course, (s) => s.subjects)
  @ManyToOne(() => Course)
  course: Course;
}
