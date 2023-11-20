import { Module } from '@nestjs/common';
import { SectionService } from './use-cases/section.service';
import { SectionController } from './infra/controllers/section.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SectionEntity } from './infra/persistence/Section.entity';
import { StudentEntity } from '../../../../../person/modules/student/infra/persistence/Student.entity';
import { CourseEntity } from '../../infra/persistence/Course.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([SectionEntity, StudentEntity, CourseEntity]),
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
