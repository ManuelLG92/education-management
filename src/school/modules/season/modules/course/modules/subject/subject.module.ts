import { Module } from '@nestjs/common';
import { SubjectService } from './use-cases/subject.service';
import { SubjectController } from './controllers/subject.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Subject } from './entity/subject';

@Module({
  imports: [MikroOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
