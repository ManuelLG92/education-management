import { Module } from '@nestjs/common';
import { CourseService } from './use-cases/course.service';
import { CourseController } from './infra/controllers/course.controller';
import { SectionModule } from './modules/section/section.module';
import { SeasonModule } from './modules/season/season.module';
import { SubjectModule } from './modules/subject/subject.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CourseEntity } from './infra/persistence/Course.entity';
import { SubjectEntity } from './modules/subject/infra/persistence/Subject.entity';
import { SeasonEntity } from './modules/season/infra/persistence/Season.entity';
import { SectionEntity } from './modules/section/infra/persistence/Section.entity';

@Module({
  imports: [
    SectionModule,
    SeasonModule,
    SubjectModule,
    MikroOrmModule.forFeature([
      CourseEntity,
      SubjectEntity,
      SeasonEntity,
      SectionEntity,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
