import { Module } from '@nestjs/common';
import { CourseService } from './use-cases/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from './infra/persistence/course.repository';
import { CourseController } from './infra/controllers/course.controller';
import { SubjectRepository } from './modules/subject/infra/persistence/subject.repository';
import { SeasonRepository } from './modules/season/infra/persistence/season.repository';
import { SectionRepository } from './modules/section/infra/persistence/section.repository';
import { SectionModule } from './modules/section/section.module';
import { SeasonModule } from './modules/season/season.module';
import { SubjectModule } from './modules/subject/subject.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from './infra/persistence/Course';
import { Subject } from './modules/subject/infra/persistence/Subject';
import { Season } from './modules/season/infra/persistence/Season';
import { Section } from './modules/section/infra/persistence/Section';

@Module({
  imports: [
    SectionModule,
    SeasonModule,
    SubjectModule,
    TypeOrmModule.forFeature([
      CourseRepository,
      SubjectRepository,
      SeasonRepository,
      SectionRepository,
    ]),
    MikroOrmModule.forFeature([Course, Subject, Season, Section]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [TypeOrmModule],
})
export class CourseModule {}
