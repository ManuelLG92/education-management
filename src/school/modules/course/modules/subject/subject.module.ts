import { Module } from '@nestjs/common';
import { SubjectService } from './use-cases/subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectRepository } from './infra/persistence/subject.repository';
import { SubjectController } from './infra/controllers/subject.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Subject } from './infra/persistence/Subject';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectRepository]),
    MikroOrmModule.forFeature([Subject]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [TypeOrmModule],
})
export class SubjectModule {}
