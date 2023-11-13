import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectService } from '../../use-cases/subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly service: SubjectService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSubjectDto) {
    // return this.service.create(createSchoolDto);
    return true;
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
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSubjectDto) {
    return this.service.update(id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
