import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exec } from './seed/courses';
import { SchoolService } from './school/use-cases/school.service';
import { SectionService } from './school/modules/course/modules/section/use-cases/section.service';
import { CourseService } from './school/modules/course/use-cases/course.service';
import { SubjectService } from './school/modules/course/modules/subject/use-cases/subject.service';
import { TeacherService } from './person/modules/teacher/use-cases/teacher.service';
import { StudentService } from './person/modules/student/use-cases/student.service';
import { faker } from '@faker-js/faker';
import { SeasonService } from './school/modules/course/modules/season/use-cases/season.service';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('edu management')
    .setDescription('edu management description')
    .setVersion('1.0')
    .addTag('EduManagement')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  Logger.log(`Server listening on port 3000`);
  const seed = async () => {
    const init = await app.resolve(DataSource);
    await init.synchronize(true);
    const { school, section, course, subjects, season, student } = exec();

    const ss = await app.resolve<SchoolService>(SchoolService);
    const schoolCreated = await ss.create({
      name: school.name,
      address: school.address,
    });

    const teacherService = await app.resolve<TeacherService>(TeacherService);
    const teacherCreated = await teacherService.create(
      student,
      schoolCreated.id,
    );

    const courseService = await app.resolve<CourseService>(CourseService);
    const courseCreated = await courseService.create(course, [], []);

    const seasonService = await app.resolve<SeasonService>(SeasonService);

    const seasonCreated = await seasonService.create({
      ...season,
      school: schoolCreated,
      courses: [courseCreated],
    });
    console.log(seasonCreated);

    const subjectsService = await app.resolve<SubjectService>(SubjectService);
    await subjectsService.create(
      {
        name: faker.person.firstName(),
        teacherId: teacherCreated.id,
      },
      courseCreated,
    );

    const sectionService = await app.resolve<SectionService>(SectionService);
    const sectionCreated = await sectionService.create(
      {
        name: section.name,
      },
      [courseCreated],
    );

    const studentService = await app.resolve<StudentService>(StudentService);

    const studentCreated = await studentService.create({
      ...student,
      schoolId: schoolCreated.id,
      person: student,
      section: {
        ...sectionCreated.toPersistence(),
        courses: [courseCreated],
      },
      sectionId: sectionCreated.id,
      parentsId: [],
    });
    console.log(studentCreated);
  };
  await seed();
}
bootstrap().catch((error) => console.log(`Failed to start server: ${error}`));
