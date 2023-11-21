import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../controllers/dto/create-course.dto';
import { UpdateCourseDto } from '../controllers/dto/update-course.dto';
import { EntityManager } from '@mikro-orm/core';
import { Course } from '../entity/course';

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

  async findAll() {
    return this.em.find(
      Course,
      {},
      {
        populate: ['subjects', 'seasons', 'sections'],
      },
    );
  }

  async findOne(id: string) {
    return this.em.findOne(
      Course,
      { id },
      { populate: ['subjects', 'seasons', 'sections'] },
    );
  }

  async update(id: string, updateSchoolDto: UpdateCourseDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto}`);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
