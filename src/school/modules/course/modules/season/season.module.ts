import { Module } from '@nestjs/common';
import { SeasonService } from './use-cases/season.service';
import { SeasonController } from './infra/controllers/season.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SeasonEntity } from './infra/persistence/Season.entity';
import { CourseEntity } from '../../infra/persistence/Course.entity';

@Module({
  imports: [MikroOrmModule.forFeature([SeasonEntity, CourseEntity])],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
