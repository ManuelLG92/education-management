import { BaseRepository } from '../../../../../common/entities/base.repository';
import { Column, Entity } from 'typeorm';

@Entity('teacher')
export class TeacherRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;
}