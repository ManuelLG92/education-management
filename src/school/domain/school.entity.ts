import { Person } from '../../person/entities/person';

export class School extends Person {
  constructor(name: string) {
    super(name);
  }
  toPersistence() {
    return {
      name: this.name,
      ...this.toPersistenceRootTypes(),
    };
  }
}
