import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
  Req,
} from '@nestjs/common';
import { SectionService } from '../use-cases/section.service';
import { CreateSectionDto, QueryDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Request } from 'express';
import { Section } from '../entity/section';
import { Collection } from '@mikro-orm/core';

@Controller('sections')
export class SectionController {
  constructor(private readonly service: SectionService) {}

  @Post()
  async create(@Body() data: CreateSectionDto) {
    return this.service.create(data);
  }

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
  async findOne(@Param('id') id: string): Promise<Section> {
    const value = await this.service.findOne(id);
    // console.log(value.students.isInitialized());
    // console.log(value.courses.getItems());
    return {
      id: value.id,
      name: value.name,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      courses: value.courses.isInitialized()
        ? value.courses
        : new Collection({}),
      students: value.students.isInitialized()
        ? value.students
        : new Collection({}),
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateSectionDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
