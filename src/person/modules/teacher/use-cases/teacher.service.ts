import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from '../controllers/dto/create-teacher.dto';
import { UpdateTeacherDto } from '../controllers/dto/update-teacher.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { TeacherEntity } from '../entity/Teacher.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { School } from '../../../../school/entity/school';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly repository: EntityRepository<TeacherEntity>,
    private readonly em: EntityManager,
  ) {}
  async create({ schoolId, ...dto }: CreateTeacherDto) {
    const school = await this.em.findOne(School, { id: schoolId });
    const entity = new TeacherEntity({ ...dto, school });
    await this.repository.nativeInsert(entity);
    return entity;
  }

  async findAll() {
    throw new Error('Not implemented yet');
  }

  async findOne(id: string) {
    throw new Error(`Not implemented yet ${id}`);
  }

  async update(id: string, updateSchoolDto: UpdateTeacherDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto}`);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
