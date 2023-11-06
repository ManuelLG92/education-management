import { Column, PrimaryColumn } from 'typeorm';

export interface IBaseRepository {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

export abstract class BaseRepository implements IBaseRepository {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt?: Date;
}
