import { Entity } from 'typeorm';
import { BaseRepository } from '../../../../../common/entities/base.repository';

@Entity('course')
export class CourseRepository extends BaseRepository {}
