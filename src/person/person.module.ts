import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';

@Module({
  imports: [StudentModule, TeacherModule],
})
export class PersonModule {}
