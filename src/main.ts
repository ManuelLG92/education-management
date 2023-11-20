import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MikroORM } from '@mikro-orm/core';
import { SchoolFixtures } from './fixtures/SchoolFixtures';

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

  app.enableShutdownHooks();
  await app.listen(3000);
  Logger.log(`Server listening on port 3000`);

  const init = await app.resolve(MikroORM);
  const generator = init.getSchemaGenerator();
  await generator.dropSchema();
  await generator.createSchema();

  const seeder = init.getSeeder();
  await seeder.seed(SchoolFixtures);

  // const seed = async () => {
  //   console.log(init.discoverEntities());
  //   const { school, section, course, subjects, season, student } = exec();
  //
  //   const schoolService = await app.resolve<SchoolService>(SchoolService);
  //   const schoolCreated = await schoolService.create({
  //     name: school.name,
  //     address: school.address,
  //   });
  //
  //   const teacherService = await app.resolve<TeacherService>(TeacherService);
  //   const teacherCreated = await teacherService.create(
  //     student,
  //     schoolCreated.id,
  //   );
  //
  //   const courseService = await app.resolve<CourseService>(CourseService);
  //   const courseCreated = await courseService.create(course, [], []);
  //
  //   const seasonService = await app.resolve<SeasonService>(SeasonService);
  //
  //   await seasonService.create({
  //     ...season,
  //     schoolId: schoolCreated.id,
  //     coursesId: [courseCreated.id],
  //   });
  //   // console.log(seasonCreated);
  //
  //   const subjectsService = await app.resolve<SubjectService>(SubjectService);
  //   await Promise.all(
  //     subjects.map(async (it) =>
  //       subjectsService.create(
  //         {
  //           name: it.name,
  //           teacherId: teacherCreated.id,
  //         },
  //         courseCreated,
  //       ),
  //     ),
  //   );
  //
  //   const sectionService = await app.resolve<SectionService>(SectionService);
  //   const sectionCreated = await sectionService.create(
  //     {
  //       name: section.name,
  //     },
  //     [courseCreated],
  //   );
  //
  //   const studentService = await app.resolve<StudentService>(StudentService);
  //
  //   await studentService.create({
  //     ...student,
  //     schoolId: schoolCreated.id,
  //     person: student,
  //     sectionId: sectionCreated.id,
  //     parentsId: [],
  //   });
  //   // console.log(studentCreated);
  // };
  // await seed();
}
bootstrap().catch((error) => console.log(`Failed to start server: ${error}`));
