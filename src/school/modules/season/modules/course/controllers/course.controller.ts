import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Req,
  Logger,
} from '@nestjs/common';
import { CourseService } from '../use-cases/course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Request } from 'express';
import { PaginationOut } from '../../../../../../common/list-helper';
import { PaginationDecorator } from '../../../../../../common/pagination.decorator';

@Controller('courses')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSchoolDto: CreateCourseDto) {
    return this.service.create(createSchoolDto);
  }

  @Get()
  @Get()
  findAll(@Req() req: Request, @PaginationDecorator() data: PaginationOut) {
    Logger.log(req.url, JSON.stringify(data));
    Logger.log('req query', JSON.stringify(req.query));
    return this.service.findAll(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateCourseDto) {
    return this.service.update(id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
