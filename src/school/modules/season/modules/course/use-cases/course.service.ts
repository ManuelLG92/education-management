import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../controllers/dto/create-course.dto';
import { UpdateCourseDto } from '../controllers/dto/update-course.dto';
import { EntityManager } from '@mikro-orm/core';
import { Course } from '../entity/course';
import {
  paginationDto,
  PaginationOut,
} from '../../../../../../common/list-helper';

@Injectable()
export class CourseService {
  constructor(private readonly em: EntityManager) {}
  async create(data: CreateCourseDto) {
    const entity = new Course({
      name: data.name,
      seasons: [],
      subjects: [],
      sections: [],
    });
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll({
    like,
    ...pagination
  }: PaginationOut & {
    like?: string;
  }) {
    const [data, count] = await this.em.findAndCount(
      Course,
      { ...(like && { name: { $ilike: `%${like}%` } }) },
      {
        populate: ['subjects', 'seasons', 'sections'],
        ...pagination,
      },
    );
    return paginationDto(data, { ...pagination, count });
  }

  async findOne(id: string) {
    return this.em.findOne(
      Course,
      { id },
      { populate: ['subjects', 'seasons', 'sections', 'sections.students'] },
    );
  }

  async update(id: string, updateSchoolDto: UpdateCourseDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto}`);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
