import { AggregateRoot } from '../../../../common/entities/aggregate-root';
import { Subject } from '../modules/subject/domain/subject';
import { Section } from '../modules/section/domain/section';
import { CourseRepository } from '../infra/persistence/course.repository';
import { Season } from '../modules/season/domain/season';

export class Course extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly subjects: ReadonlyArray<Subject>,
    public readonly seasons: ReadonlyArray<Season>,
    public readonly sections: ReadonlyArray<Section>,
  ) {
    super();
  }

  toPersistence(): CourseRepository {
    return {
      name: this.name,
      seasons: this.seasons.map((it) => it.toPersistence()),
      subjects: this.subjects.map((it) => it.toPersistence()),
      sections: this.sections.map((item) => item.toPersistence()),
      ...this.toPersistenceRootTypes(),
    };
  }
}
