import { AggregateRoot } from '../../../../common/entities/aggregate-root';
import { Subject } from '../modules/subject/domain/subject';
import { Section } from '../modules/section/domain/section';

export class Course extends AggregateRoot {
  constructor(
    public readonly subjects: ReadonlyArray<Subject>,
    public readonly sections: ReadonlyArray<Section>,
  ) {
    super();
  }
  toPersistence(): Record<string, unknown> {
    return {
      subjects: this.subjects,
      sections: this.sections,
      ...this.toPersistenceRootTypes(),
    };
  }
}
