import { Module } from '@nestjs/common';
import { SectionService } from './use-cases/section.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionRepository } from './infra/persistence/section.repository';
import { SectionController } from './infra/controllers/section.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SectionRepository])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
