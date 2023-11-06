import { Module } from '@nestjs/common';
import { TeacherService } from './use-cases/teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherRepository } from './infra/persistence/teacher.repository';
import { TeacherController } from './infra/controllers/teacher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
