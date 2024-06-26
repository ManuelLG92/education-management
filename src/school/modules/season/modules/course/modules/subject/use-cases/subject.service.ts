import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from '../controllers/dto/create-subject.dto';
import { UpdateSubjectDto } from '../controllers/dto/update-subject.dto';
import { EntityManager } from '@mikro-orm/core';
import { Course } from '../../../entity/course';
import { Subject } from '../entity/subject';

@Injectable()
export class SubjectService {
  constructor(private readonly em: EntityManager) {}
  async create({ name, courseId }: CreateSubjectDto) {
    const course = await this.em.findOne(Course, courseId);
    const entity = new Subject({ name, course });
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll() {
    throw new Error('Not implemented yet');
  }

  async findOne(id: string) {
    throw new Error(`Not implemented yet ${id}`);
  }

  async update(id: string, updateSchoolDto: UpdateSubjectDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto}`);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
