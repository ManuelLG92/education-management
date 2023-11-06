import { BaseRepository } from '../../../../../common/entities/base.repository';
import { Column, Entity } from 'typeorm';

@Entity('season')
export class SeasonRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'date' })
  startAt: Date;

  @Column({ type: 'date' })
  endAt?: Date;
}
