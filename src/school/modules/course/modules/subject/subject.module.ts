import { Module } from '@nestjs/common';
import { SubjectService } from './use-cases/subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectRepository } from './infra/persistence/subject.repository';
import { SubjectController } from './infra/controllers/subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectRepository])],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [TypeOrmModule],
})
export class SubjectModule {}
