import { Module } from '@nestjs/common';
import { SchoolService } from './use-cases/school.service';
import { SchoolController } from './infra/controllers/school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolRepository } from './infra/persistence/school.repository';
import { SeasonModule } from './modules/season/season.module';
import { CourseModule } from './modules/course/course.module';
import { SubjectModule } from './modules/subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolRepository]),
    SeasonModule,
    CourseModule,
    SubjectModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
