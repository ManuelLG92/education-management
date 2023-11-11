import { CourseRepository } from '../school/modules/course/infra/persistence/course.repository';
import { faker } from '@faker-js/faker';
import { SectionRepository } from '../school/modules/course/modules/section/infra/persistence/section.repository';
import { SubjectRepository } from '../school/modules/course/modules/subject/infra/persistence/subject.repository';
import { SchoolRepository } from '../school/infra/persistence/school.repository';
import { StudentRepository } from '../person/modules/student/infra/persistence/student.repository';
import { SeasonRepository } from '../school/modules/course/modules/season/infra/persistence/season.repository';
import { PersonRoles } from '../person/domain/person';

const repeaterFactory = <T>(times: number = 10, handler: () => T): Array<T> => {
  return Array.from({ length: times }, () => handler());
};

export const exec = () => {
  const subject = (): SubjectRepository => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    createdAt: new Date(),
  });
  const availableSubjects = repeaterFactory(10, () => subject());
  const school = (seasons: SeasonRepository[] = []): SchoolRepository => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    seasons,
    createdAt: new Date(),
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      street: faker.location.streetAddress(),
      cp: +faker.location.zipCode(),
    },
  });

  const season = (
    school: SchoolRepository,
    courses: CourseRepository[],
  ): SeasonRepository => ({
    id: faker.string.uuid(),
    name: faker.commerce.isbn(),
    school,
    courses,
    startAt: new Date(),
    endAt: faker.date.future(),
    createdAt: new Date(),
  });

  const course = (
    sections: SectionRepository[] = [],
    seasons: SeasonRepository[] = [],
  ): CourseRepository => ({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    sections,
    seasons,
    subjects: availableSubjects,
    createdAt: new Date(),
  });
  const section = (
    courses: CourseRepository[],
    students: StudentRepository[],
  ): SectionRepository => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    courses,
    students,
    createdAt: new Date(),
  });

  const student = (section: SectionRepository): StudentRepository => ({
    id: faker.string.uuid(),
    createdAt: new Date(),
    name: faker.person.firstName(),
    age: faker.number.int({ min: 18 }),
    role: PersonRoles.STUDENT,
    parents: [],
    section,
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      street: faker.location.streetAddress(),
      cp: +faker.location.zipCode(),
    },
  });

  const school1 = school([]);
  const season1 = season(school1, []);
  school1.seasons = [season1];
  const section1 = section([], []);
  const course1 = course([section1], [season1]);
  section1.courses = [course1];
  const student1 = student(section1);
  section1.students = [student1];
  console.log('school', school1);
  console.log('season', season1);
  console.log('course', course1);
  console.log('section', section1);
  console.log('student', student1);
  console.log('subjects', availableSubjects);

  return {
    school: school1,
    season: season1,
    course: course1,
    section: section1,
    student: student1,
    subjects: availableSubjects,
  };
};
