import { Module } from '@nestjs/common';
import { SeasonService } from './use-cases/season.service';
import { SeasonController } from './controllers/season.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Season } from './entity/season';
import { Course } from '../../entity/course';

@Module({
  imports: [MikroOrmModule.forFeature([Season, Course])],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
