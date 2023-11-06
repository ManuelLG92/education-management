import { Column } from 'typeorm';
import { BaseRepository } from '../../../common/entities/base.repository';
import { AddressRepository } from './address.repository';

export class PersonRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column(() => AddressRepository)
  address: AddressRepository;
}
