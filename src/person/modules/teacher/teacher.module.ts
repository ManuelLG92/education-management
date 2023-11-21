import { Module } from '@nestjs/common';
import { TeacherService } from './use-cases/teacher.service';
import { TeacherController } from './controllers/teacher.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TeacherEntity } from './entity/Teacher.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TeacherEntity])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
