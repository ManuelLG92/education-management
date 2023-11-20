import { Module } from '@nestjs/common';
import { TemplateService } from './use-cases/template.service';
import { TemplateRepository } from './infra/persistence/template.repository';
import { TemplateController } from './infra/controllers/template.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([TemplateRepository])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
