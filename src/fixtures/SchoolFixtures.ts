import { SchoolEntity } from '../school/infra/persistence/School.entity';
import { faker } from '@faker-js/faker';
import { EntityManager } from '@mikro-orm/core';
import { SeasonEntity } from '../school/modules/course/modules/season/infra/persistence/Season.entity';
import { Seeder } from '@mikro-orm/seeder';
import { CourseEntity } from '../school/modules/course/infra/persistence/Course.entity';
import { SectionEntity } from '../school/modules/course/modules/section/infra/persistence/Section.entity';
import { StudentEntity } from '../person/modules/student/infra/persistence/Student.entity';
import { PersonRoles } from '../person/domain/person';
import { SubjectEntity } from '../school/modules/course/modules/subject/infra/persistence/Subject.entity';
import { TeacherEntity } from '../person/modules/teacher/infra/persistence/Teacher.entity';
const repeaterFactory = <T>(times: number = 10, handler: () => T): Array<T> => {
  return Array.from({ length: times }, () => handler());
};
export class SchoolFixtures extends Seeder {
  async run(em: EntityManager): Promise<void> {
    try {
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

      const schoolEntity = new SchoolEntity(faker.company.name(), {
        city: faker.location.city(),
        country: faker.location.country(),
        state: faker.location.state(),
        street: faker.location.streetAddress(),
        postalCode: faker.number.int({ max: 3000 }).toString(10),
      });
      em.persist(schoolEntity);
      const seasonEntity = new SeasonEntity(
        faker.commerce.isbn(),
        new Date(),
        new Date(),
        schoolEntity,
      );
      em.persist(seasonEntity);
      const section1 = new SectionEntity(faker.person.firstName());

      const subject = (): SubjectEntity => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
        createdAt: new Date(),
        course: null,
      });

      em.persist(section1);
      const courseEntity = new CourseEntity(faker.person.firstName());
      courseEntity.sections.add(section1);
      em.persist(courseEntity);

      const availableSubjects = repeaterFactory(10, () => subject());
      availableSubjects.forEach((item) => {
        const subjectEntity = new SubjectEntity(item.name, courseEntity);
        em.persist(subjectEntity);
      });
      seasonEntity.courses.add(courseEntity);
      em.persist(seasonEntity);
      const studentData = student(section1);
      const studentEntity = new StudentEntity(
        studentData.name,
        studentData.age,
        studentData.address,
        section1,
      );
      em.persist(studentEntity);

      const teacher = new TeacherEntity(
        faker.person.firstName(),
        25,
        {
          city: faker.location.city(),
          country: faker.location.country(),
          state: faker.location.state(),
          street: faker.location.streetAddress(),
          postalCode: faker.number.int({ max: 3000 }).toString(10),
        },
        schoolEntity,
      );
      em.persist(teacher);
      await em.flush();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
