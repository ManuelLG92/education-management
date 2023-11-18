import { Module } from '@nestjs/common';
import { SeasonService } from './use-cases/season.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonRepository } from './infra/persistence/season.repository';
import { SeasonController } from './infra/controllers/season.controller';
import { CourseRepository } from '../../infra/persistence/course.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Season } from './infra/persistence/Season';
import { Course } from '../../infra/persistence/Course';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeasonRepository, CourseRepository]),
    MikroOrmModule.forFeature([Season, Course]),
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [TypeOrmModule],
})
export class SeasonModule {}
