import { Module } from '@nestjs/common';
import { TemplateService } from './use-cases/template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateRepository } from './infra/persistence/template.repository';
import { TemplateController } from './infra/controllers/template.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateRepository])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
