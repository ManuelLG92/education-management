import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from '../infra/controllers/dto/create-subject.dto';
import { UpdateSubjectDto } from '../infra/controllers/dto/update-subject.dto';
import { EntityManager } from '@mikro-orm/core';
import { Course } from '../../../infra/persistence/Course';
import { Subject } from '../infra/persistence/Subject';

@Injectable()
export class SubjectService {
  constructor(private readonly em: EntityManager) {}
  async create(data: CreateSubjectDto, course: Course) {
    const entity = new Subject(data.name, course);
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
