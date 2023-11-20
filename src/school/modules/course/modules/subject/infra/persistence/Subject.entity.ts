import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CourseEntity } from '../../../../infra/persistence/Course.entity';
import { Base } from '../../../../../../../common/entities/Base';

@Entity()
export class SubjectEntity extends Base {
  @Property({ length: 100 })
  name!: string;

  @ManyToOne({
    entity: () => CourseEntity,
    fieldName: 'courseId',
    nullable: true,
  })
  course?: CourseEntity;

  constructor(name: string, courseEntity: CourseEntity) {
    super();
    this.name = name;
    this.course = courseEntity;
  }
}
