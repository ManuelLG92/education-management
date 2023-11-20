import { Module } from '@nestjs/common';
import { StudentService } from './use-cases/student.service';
import { StudentController } from './infra/controllers/student.controller';
import { ParentsService } from './use-cases/parents.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StudentEntity } from './infra/persistence/Student.entity';
import { ParentEntity } from './infra/persistence/Parent.entity';

@Module({
  imports: [MikroOrmModule.forFeature([StudentEntity, ParentEntity])],
  controllers: [StudentController],
  providers: [StudentService, ParentsService],
})
export class StudentModule {}
