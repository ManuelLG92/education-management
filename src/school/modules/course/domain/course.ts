import { AggregateRoot } from '../../../../common/entities/aggregate-root';
import { Subject } from '../modules/subject/domain/subject';
import { Section } from '../modules/section/domain/section';
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
}
