import { Module } from '@nestjs/common';
import { SectionService } from './use-cases/section.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionRepository } from './infra/persistence/section.repository';
import { SectionController } from './infra/controllers/section.controller';
import { CourseRepository } from '../../infra/persistence/course.repository';
import { StudentRepository } from '../../../../../person/modules/student/infra/persistence/student.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SectionRepository,
      StudentRepository,
      CourseRepository,
    ]),
  ],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [TypeOrmModule],
})
export class SectionModule {}
