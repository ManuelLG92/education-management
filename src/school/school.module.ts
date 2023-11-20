import { Module } from '@nestjs/common';
import { SchoolService } from './use-cases/school.service';
import { SchoolController } from './infra/controllers/school.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { SchoolRepository } from './infra/persistence/school.repository';
import { SeasonModule } from './modules/course/modules/season/season.module';
import { CourseModule } from './modules/course/course.module';
import { SubjectModule } from './modules/course/modules/subject/subject.module';
import { SectionModule } from './modules/course/modules/section/section.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SchoolEntity } from './infra/persistence/School.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([SchoolRepository]),
    MikroOrmModule.forFeature([SchoolEntity]),
    CourseModule,
    SeasonModule,
    SectionModule,
    SubjectModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
