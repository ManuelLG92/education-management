import { Module } from '@nestjs/common';
import { SeasonService } from './use-cases/season.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonRepository } from './infra/persistence/season.repository';
import { SeasonController } from './infra/controllers/season.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonRepository])],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
