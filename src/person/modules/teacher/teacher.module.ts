import { Module } from '@nestjs/common';
import { TeacherService } from './use-cases/teacher.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TeacherRepository } from './infra/persistence/teacher.repository';
import { TeacherController } from './infra/controllers/teacher.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TeacherEntity } from './infra/persistence/Teacher.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([TeacherRepository]),
    MikroOrmModule.forFeature([TeacherEntity]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  // exports: [TypeOrmModule],
})
export class TeacherModule {}
