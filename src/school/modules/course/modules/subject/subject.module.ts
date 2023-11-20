import { Module } from '@nestjs/common';
import { SubjectService } from './use-cases/subject.service';
import { SubjectController } from './infra/controllers/subject.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SubjectEntity } from './infra/persistence/Subject.entity';

@Module({
  imports: [MikroOrmModule.forFeature([SubjectEntity])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
