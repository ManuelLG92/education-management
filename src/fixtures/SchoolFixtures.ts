import { faker } from '@faker-js/faker';
import { EntityManager } from '@mikro-orm/core';
import { Season } from '../school/modules/course/modules/season/entity/season';
import { Seeder } from '@mikro-orm/seeder';
import { Course } from '../school/modules/course/entity/course';
import { Section } from '../school/modules/course/modules/section/entity/section';
import { Student } from '../person/modules/student/entity/student';
import { Subject } from '../school/modules/course/modules/subject/entity/subject';
import { TeacherEntity } from '../person/modules/teacher/entity/Teacher.entity';
import { PersonRoles } from '../person/entity/person';
import { School } from '../school/entity/school';
const repeaterFactory = <T>(times: number = 10, handler: () => T): Array<T> => {
  return Array.from({ length: times }, () => handler());
};
export class SchoolFixtures extends Seeder {
  async run(em: EntityManager): Promise<void> {
    try {
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

      const schoolEntity = new School({
        address: {
          city: faker.location.city(),
          country: faker.location.country(),
          state: faker.location.state(),
          street: faker.location.streetAddress(),
          postalCode: faker.number.int({ max: 3000 }).toString(10),
        },
        name: faker.company.name(),
        seasons: [],
        teachers: [],
      });
      em.persist(schoolEntity);
      const seasonEntity = new Season({
        name: faker.commerce.isbn(),
        startAt: new Date(),
        endAt: new Date(),
        school: schoolEntity,
        courses: [],
      });
      em.persist(seasonEntity);
      const section1 = new Section({
        name: faker.person.firstName(),
        students: [],
        courses: [],
      });

      const subject = (): Subject => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
        createdAt: new Date(),
        course: null,
      });

      em.persist(section1);
      const courseEntity = new Course({
        name: faker.person.firstName(),
        sections: [section1],
        subjects: [],
        seasons: [],
      });
      courseEntity.sections.add(section1);
      em.persist(courseEntity);

      const availableSubjects = repeaterFactory(10, () => subject());
      availableSubjects.forEach((item) => {
        const subjectEntity = new Subject({
          name: item.name,
          course: courseEntity,
        });
        em.persist(subjectEntity);
      });
      seasonEntity.courses.add(courseEntity);
      em.persist(seasonEntity);
      const studentData = student(section1);
      const studentEntity = new Student({
        name: studentData.name,
        age: 20,
        address: studentData.address,
        section: section1,
        parents: [],
      });
      em.persist(studentEntity);

      const teacher = new TeacherEntity({
        name: faker.person.firstName(),
        age: 25,
        address: {
          city: faker.location.city(),
          country: faker.location.country(),
          state: faker.location.state(),
          street: faker.location.streetAddress(),
          postalCode: faker.number.int({ max: 3000 }).toString(10),
        },
        school: schoolEntity,
      });
      em.persist(teacher);
      await em.flush();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
