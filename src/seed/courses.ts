import { faker } from '@faker-js/faker';
import { PersonRoles } from '../person/domain/person';
import { SectionEntity } from '../school/modules/course/modules/section/infra/persistence/Section.entity';
import { SubjectEntity } from '../school/modules/course/modules/subject/infra/persistence/Subject.entity';
import { SeasonEntity } from '../school/modules/course/modules/season/infra/persistence/Season.entity';
import { SchoolEntity } from '../school/infra/persistence/School.entity';
import { CourseEntity } from '../school/modules/course/infra/persistence/Course.entity';
import { StudentEntity } from '../person/modules/student/infra/persistence/Student.entity';
import { Collection } from '@mikro-orm/core';
import { TeacherEntity } from '../person/modules/teacher/infra/persistence/Teacher.entity';

const repeaterFactory = <T>(times: number = 10, handler: () => T): Array<T> => {
  return Array.from({ length: times }, () => handler());
};

export const exec = () => {
  const subject = (): SubjectEntity => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    createdAt: new Date(),
    course: null,
  });
  const availableSubjects = repeaterFactory(10, () => subject());
  const school = (seasons: SeasonEntity[] = []): SchoolEntity => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    seasons: new Collection<SeasonEntity>(seasons),
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

  const season = (
    school: SchoolEntity,
    courses: CourseEntity[],
  ): SeasonEntity => ({
    id: faker.string.uuid(),
    name: faker.commerce.isbn(),
    school: school,
    courses: new Collection<CourseEntity>(courses),
    startAt: new Date(),
    endAt: faker.date.future(),
    createdAt: new Date(),
  });

  const course = (
    sections: SectionEntity[] = [],
    seasons: SeasonEntity[] = [],
  ): CourseEntity => ({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    sections: new Collection<SectionEntity>(sections),
    seasons: new Collection<SeasonEntity>(seasons),
    subjects: new Collection<SubjectEntity>(availableSubjects),
    createdAt: new Date(),
  });
  const section = (
    courses: CourseEntity[],
    students: StudentEntity[],
  ): SectionEntity => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    courses: new Collection<CourseEntity>(courses),
    students: new Collection<StudentEntity>(students),
    createdAt: new Date(),
  });

  const student = (section: SectionEntity) => ({
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
  section1.courses = new Collection<CourseEntity>(course1);
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
