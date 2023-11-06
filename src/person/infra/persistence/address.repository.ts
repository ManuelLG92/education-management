import { Column } from 'typeorm';
import { IAddress } from '../../domain/address';

export class AddressRepository implements IAddress {
  @Column({ type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'int' })
  cp: number;
}
