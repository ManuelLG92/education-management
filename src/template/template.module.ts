import { Module } from '@nestjs/common';
import { TemplateService } from './use-cases/template.service';
import { TemplateController } from './controllers/template.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Template } from './entity/template.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
