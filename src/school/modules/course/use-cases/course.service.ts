import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../infra/controllers/dto/create-course.dto';
import { UpdateCourseDto } from '../infra/controllers/dto/update-course.dto';
import { EntityManager } from '@mikro-orm/core';
import { SubjectEntity } from '../modules/subject/infra/persistence/Subject.entity';
import { SeasonEntity } from '../modules/season/infra/persistence/Season.entity';
import { CourseEntity } from '../infra/persistence/Course.entity';
// import { SectionEntity } from '../modules/section/infra/persistence/Section.entity';

@Injectable()
export class CourseService {
  constructor(private readonly em: EntityManager) {}
  async create(
    data: CreateCourseDto,
    subjects: Array<SubjectEntity>,
    seasons: Array<SeasonEntity>,
  ) {
    const entity = new CourseEntity(data.name);
    entity.seasons.add(seasons);
    entity.subjects.add(subjects);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll() {
    return this.em.find(
      CourseEntity,
      {},
      {
        populate: ['subjects', 'seasons', 'sections'],
      },
    );
  }

  async findOne(id: string) {
    return this.em.findOne(
      CourseEntity,
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
