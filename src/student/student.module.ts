import { Module } from '@nestjs/common';
import { StudentService } from './use-cases/student.service';
import { StudentController } from './infra/controllers/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './infra/persistence/student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule],
})
export class StudentModule {}
