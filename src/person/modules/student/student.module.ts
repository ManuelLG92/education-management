import { Module } from '@nestjs/common';
import { StudentService } from './use-cases/student.service';
import { StudentController } from './controllers/student.controller';
import { ParentsService } from './use-cases/parents.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Student } from './entity/student';
import { Parent } from './entity/parent';

@Module({
  imports: [MikroOrmModule.forFeature([Student, Parent])],
  controllers: [StudentController],
  providers: [StudentService, ParentsService],
})
export class StudentModule {}
