import { Module } from '@nestjs/common';
import { CourseService } from './use-cases/course.service';
import { CourseController } from './controllers/course.controller';
import { SectionModule } from './modules/section/section.module';
import { SeasonModule } from './modules/season/season.module';
import { SubjectModule } from './modules/subject/subject.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from './entity/course';
import { Subject } from './modules/subject/entity/subject';
import { Season } from './modules/season/entity/season';
import { Section } from './modules/section/entity/section';

@Module({
  imports: [
    SectionModule,
    SeasonModule,
    SubjectModule,
    MikroOrmModule.forFeature([Course, Subject, Season, Section]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
