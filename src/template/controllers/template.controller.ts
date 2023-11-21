import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemplateService } from '../use-cases/template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('school')
export class TemplateController {
  constructor(private readonly service: TemplateService) {}

  @Post()
  create(@Body() createSchoolDto: CreateTemplateDto) {
    return this.service.create(createSchoolDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateTemplateDto) {
    return this.service.update(id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
