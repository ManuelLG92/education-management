import { AggregateRoot } from '../../../../common/entities/aggregate-root';
import { Teacher } from '../../../../person/modules/teacher/domain/teacher';

export class Subject extends AggregateRoot {
  constructor(
    public readonly name: string,
    public readonly teacher: Teacher,
  ) {
    super();
  }
  toPersistence(): Record<string, unknown> {
    return {
      name: this.name,
      teacher: this.teacher,
      ...this.toPersistenceRootTypes(),
    };
  }
}
