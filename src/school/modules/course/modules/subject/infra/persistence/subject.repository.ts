import { Column, Entity } from 'typeorm';
import { BaseRepository } from '../../../../../../../common/entities/base.repository';

@Entity('subject')
export class SubjectRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;
}
