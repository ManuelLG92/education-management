import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exec } from './seed/courses';
import { SchoolService } from './school/use-cases/school.service';
import { SectionService } from './school/modules/course/modules/section/use-cases/section.service';

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
  const { school, section, course, subjects, season, student } = exec();
  console.log(school.address);

  const ss = await app.resolve<SchoolService>(SchoolService);
  const schoolCreated = await ss.create({
    name: school.name,
    address: school.address,
  });
  const sectionService = await app.resolve<SectionService>(SectionService);
  sectionService.create({
    name: section.name,
  });
  // const courseService = await app.resolve<CourseService>(CourseService);
  // courseService.create({})

  console.log(schoolCreated);
}
bootstrap().catch((error) => console.log(`Failed to start server: ${error}`));
