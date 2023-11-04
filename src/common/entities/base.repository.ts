import { Column, PrimaryColumn } from 'typeorm';

export abstract class BaseRepository {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt?: Date;
}
