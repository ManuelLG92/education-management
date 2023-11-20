import { Module } from '@nestjs/common';
import { StudentService } from './use-cases/student.service';
import { StudentController } from './infra/controllers/student.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { StudentRepository } from './infra/persistence/student.repository';
// import { ParentRepository } from './infra/persistence/parent.repository';
import { ParentsService } from './use-cases/parents.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StudentEntity } from './infra/persistence/Student.entity';
import { ParentEntity } from './infra/persistence/Parent.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([StudentRepository, ParentRepository]),
    MikroOrmModule.forFeature([StudentEntity, ParentEntity]),
  ],
  controllers: [StudentController],
  providers: [StudentService, ParentsService],
  // exports: [TypeOrmModule],
})
export class StudentModule {}
