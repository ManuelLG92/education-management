import { Module } from '@nestjs/common';
import { SchoolService } from './use-cases/school.service';
import { SchoolController } from './controllers/school.controller';
import { SeasonModule } from './modules/course/modules/season/season.module';
import { CourseModule } from './modules/course/course.module';
import { SubjectModule } from './modules/course/modules/subject/subject.module';
import { SectionModule } from './modules/course/modules/section/section.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { School } from './entity/school';

@Module({
  imports: [
    MikroOrmModule.forFeature([School]),
    CourseModule,
    SeasonModule,
    SectionModule,
    SubjectModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
