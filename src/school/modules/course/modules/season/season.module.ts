import { Module } from '@nestjs/common';
import { SeasonService } from './use-cases/season.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonRepository } from './infra/persistence/season.repository';
import { SeasonController } from './infra/controllers/season.controller';
import { CourseRepository } from '../../infra/persistence/course.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonRepository, CourseRepository])],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [TypeOrmModule],
})
export class SeasonModule {}
