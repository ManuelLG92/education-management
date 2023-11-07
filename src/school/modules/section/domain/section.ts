import { AggregateRoot } from '../../../../common/entities/aggregate-root';
import { Student } from '../../../../person/modules/student/domain/student';

export class Section extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly courseId: string,
    public readonly sections: ReadonlyArray<Student>,
  ) {
    super();
  }
  toPersistence(): Record<string, unknown> {
    return {
      name: this.name,
      courseId: this.courseId,
      sections: this.sections,
      ...this.toPersistenceRootTypes(),
    };
  }
}
