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
  Query,
  Logger,
} from '@nestjs/common';
import { CourseService } from '../use-cases/course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Request } from 'express';
import { QueryDto } from '../modules/section/controllers/dto/create-section.dto';

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
  findAll(@Req() req: Request, @Query() query: QueryDto) {
    Logger.log(req.url, JSON.stringify(query));
    return this.service.findAll({
      ...(query.page && { page: Number(query.page) }),
      ...(query.limit && { limit: Number(query.limit) }),
      like: query.like,
    });
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
