import { Person } from '../../person/entities/person';

interface IBase {
  id: string;

  createdAt: Date;
  updatedAt: Date;
}
export interface IStudent extends IBase {
  name: string;
  age: number;
  level: string;
}
export class Student extends Person {
  constructor(
    name: string,
    private readonly age: number,
    private readonly level: string,
    private readonly schoolId: string,
  ) {
    super(name);
  }

  toPersistence() {
    return {
      name: this.name,
      age: this.age,
      level: this.level,
      schoolId: this.schoolId,
      ...this.toPersistenceRootTypes(),
    };
  }
}
