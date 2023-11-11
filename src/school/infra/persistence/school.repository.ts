import { BaseRepository } from '../../../common/entities/base.repository';
import { Column, Entity, OneToMany } from 'typeorm';
import { SeasonRepository } from '../../modules/course/modules/season/infra/persistence/season.repository';
import { AddressRepository } from '../../../person/infra/persistence/address.repository';

@Entity('school')
export class SchoolRepository extends BaseRepository {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => SeasonRepository, (parent) => parent.school)
  seasons: SeasonRepository[];

  @Column(() => AddressRepository, {})
  address: AddressRepository;
}
