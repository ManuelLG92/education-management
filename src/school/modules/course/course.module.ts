import { Module } from '@nestjs/common';
import { CourseService } from './use-cases/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from './infra/persistence/course.repository';
import { CourseController } from './infra/controllers/course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
