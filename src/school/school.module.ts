import { Module } from '@nestjs/common';
import { SchoolService } from './use-cases/school.service';
import { SchoolController } from './infra/controllers/school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolRepository } from './infra/persistence/school.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolRepository])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
