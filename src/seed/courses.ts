import { faker } from '@faker-js/faker';
import { PersonRoles } from '../person/domain/person';
import { Section } from '../school/modules/course/modules/section/infra/persistence/Section';
import { Subject } from '../school/modules/course/modules/subject/infra/persistence/Subject';
import { Season } from '../school/modules/course/modules/season/infra/persistence/Season';
import { School } from '../school/infra/persistence/School';
import { Course } from '../school/modules/course/infra/persistence/Course';
import { Student } from '../person/modules/student/infra/persistence/Student';
import { Collection } from '@mikro-orm/core';

const repeaterFactory = <T>(times: number = 10, handler: () => T): Array<T> => {
  return Array.from({ length: times }, () => handler());
};

export const exec = () => {
  const subject = (): Subject => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    createdAt: new Date(),
    course: null,
  });
  const availableSubjects = repeaterFactory(10, () => subject());
  const school = (seasons: Season[] = []): School => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    seasons: new Collection<Season, object>(seasons),
    createdAt: new Date(),
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      street: faker.location.streetAddress(),
      postalCode: faker.number.int({ max: 3000 }).toString(10),
    },
  });

  const season = (school: School, courses: Course[]): Season => ({
    id: faker.string.uuid(),
    name: faker.commerce.isbn(),
    school: school,
    courses: new Collection<Course>(courses),
    startAt: new Date(),
    endAt: faker.date.future(),
    createdAt: new Date(),
  });

  const course = (
    sections: Section[] = [],
    seasons: Season[] = [],
  ): Course => ({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    sections: new Collection<Section, object>(sections),
    seasons: new Collection<Season, object>(seasons),
    subjects: new Collection<Subject, object>(availableSubjects),
    createdAt: new Date(),
  });
  const section = (courses: Course[], students: Student[]): Section => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    course: new Collection<Course, object>(courses),
    students: new Collection<Student, object>(students),
    createdAt: new Date(),
  });

  const student = (section: Section) => ({
    id: faker.string.uuid(),
    createdAt: new Date(),
    name: faker.person.firstName(),
    age: faker.number.int({ min: 18, max: 100 }),
    role: PersonRoles.STUDENT,
    parents: [],
    section,
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      street: faker.location.streetAddress(),
      postalCode: faker.number.int({ max: 3000 }),
    },
  });

  const school1 = school([]);
  const season1 = season(school1, []);
  // school1.seasons = [season1];
  const section1 = section([], []);
  const course1 = course([section1], [season1]);
  section1.course = new Collection<Course>(course1);
  const student1 = student(section1);
  // section1.students = [student1];
  // console.log('school', school1);
  // console.log('season', season1);
  // console.log('course', course1);
  // console.log('section', section1);
  // console.log('student', student1);
  // console.log('subjects', availableSubjects);

  return {
    school: school1,
    season: season1,
    course: course1,
    section: section1,
    student: student1,
    subjects: availableSubjects,
  };
};
