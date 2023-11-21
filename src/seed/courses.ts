import { faker } from '@faker-js/faker';
import { Section } from '../school/modules/season/modules/course/modules/section/entity/section';
import { Subject } from '../school/modules/season/modules/course/modules/subject/entity/subject';
import { Season } from '../school/modules/season/entity/season';
import { Course } from '../school/modules/season/modules/course/entity/course';
import { Student } from '../person/modules/student/entity/student';
import { Collection } from '@mikro-orm/core';
import { TeacherEntity } from '../person/modules/teacher/entity/Teacher.entity';
import { PersonRoles } from '../person/entity/person';
import { School } from '../school/entity/school';

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
    seasons: new Collection<Season>(seasons),
    createdAt: new Date(),
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      street: faker.location.streetAddress(),
      postalCode: faker.number.int({ max: 3000 }).toString(10),
    },
    teachers: new Collection<TeacherEntity, object>(null),
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
    sections: new Collection<Section>(sections),
    seasons: new Collection<Season>(seasons),
    subjects: new Collection<Subject>(availableSubjects),
    createdAt: new Date(),
  });
  const section = (courses: Course[], students: Student[]): Section => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    courses: new Collection<Course>(courses),
    students: new Collection<Student>(students),
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
      postalCode: faker.number.int({ max: 3000 }).toString(),
    },
  });

  const school1 = school([]);
  const season1 = season(school1, []);
  // school1.seasons = [season1];
  const section1 = section([], []);
  const course1 = course([section1], [season1]);
  section1.courses = new Collection<Course>(course1);
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
