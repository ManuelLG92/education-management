import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseRepository } from '../../../../../../../common/entities/base.repository';
import { CourseEntity } from '../../../../infra/persistence/Course.entity';

@Entity('subject-old')
export class SubjectRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  // @ManyToOne(() => CourseEntity, (s) => s.subjects)
  @ManyToOne(() => CourseEntity)
  course: CourseEntity;
}
