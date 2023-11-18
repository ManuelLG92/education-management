import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../infra/controllers/dto/create-course.dto';
import { UpdateCourseDto } from '../infra/controllers/dto/update-course.dto';
import { Collection, EntityManager } from '@mikro-orm/core';
import { Subject } from '../modules/subject/infra/persistence/Subject';
import { Season } from '../modules/season/infra/persistence/Season';
import { Course } from '../infra/persistence/Course';
import { Section } from '../modules/section/infra/persistence/Section';

@Injectable()
export class CourseService {
  constructor(private readonly em: EntityManager) {}
  async create(
    data: CreateCourseDto,
    subjects: Array<Subject>,
    seasons: Array<Season>,
  ) {
    const entity = new Course(
      data.name,
      new Collection<Season>(seasons),
      new Collection<Section>([]),
      new Collection<Subject>(subjects),
    );
    await this.em.persistAndFlush(entity);
    return this.findOne(entity.id);
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
