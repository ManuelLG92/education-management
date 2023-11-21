import { Module } from '@nestjs/common';
import { SectionService } from './use-cases/section.service';
import { SectionController } from './controllers/section.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Section } from './entity/section';
import { Student } from '../../../../../../../person/modules/student/entity/student';
import { Course } from '../../entity/course';

@Module({
  imports: [MikroOrmModule.forFeature([Section, Student, Course])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
