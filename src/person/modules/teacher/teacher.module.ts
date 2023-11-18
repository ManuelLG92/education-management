import { Module } from '@nestjs/common';
import { TeacherService } from './use-cases/teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherRepository } from './infra/persistence/teacher.repository';
import { TeacherController } from './infra/controllers/teacher.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Teacher } from './infra/persistence/Teacher';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherRepository]),
    MikroOrmModule.forFeature([Teacher]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TypeOrmModule],
})
export class TeacherModule {}
