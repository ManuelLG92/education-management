import { Module } from '@nestjs/common';
import { SectionService } from './use-cases/section.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionRepository } from './infra/persistence/section.repository';
import { SectionController } from './infra/controllers/section.controller';
import { CourseRepository } from '../../infra/persistence/course.repository';
import { StudentRepository } from '../../../../../person/modules/student/infra/persistence/student.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Section } from './infra/persistence/Section';
import { Student } from '../../../../../person/modules/student/infra/persistence/Student';
import { Course } from '../../infra/persistence/Course';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SectionRepository,
      StudentRepository,
      CourseRepository,
    ]),
    MikroOrmModule.forFeature([Section, Student, Course]),
  ],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [TypeOrmModule],
})
export class SectionModule {}
