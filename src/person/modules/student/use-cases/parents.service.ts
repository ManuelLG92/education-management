import { Injectable } from '@nestjs/common';
import { UpdateStudentDto } from '../controllers/dto/update-student.dto';
import { CreatePersonDto } from '../../../request-dto/create-person.dto';
import { Parent } from '../entity/parent';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private readonly repository: EntityRepository<Parent>,
    private readonly em: EntityManager,
  ) {}
  async create(data: CreatePersonDto) {
    const parentEntity = new Parent(data);
    await this.em.persistAndFlush(parentEntity);
  }

  async countByIds(ids: string[]) {
    return this.repository.count({ id: { $in: ids } });
  }
  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    return this.repository.findOne({ id });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    // return this.repository.update(id, updateStudentDto);
    return Promise.resolve({ id, updateStudentDto });
  }

  async remove(id: string) {
    await this.em.nativeDelete(Parent, id);
  }
}
