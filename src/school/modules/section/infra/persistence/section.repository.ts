import { Entity } from 'typeorm';
import { BaseRepository } from '../../../../../common/entities/base.repository';

@Entity('subject')
export class SectionRepository extends BaseRepository {}
