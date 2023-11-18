import { Injectable } from '@nestjs/common';
import { UpdateStudentDto } from '../infra/controllers/dto/update-student.dto';
import { CreatePersonDto } from '../../../create-person.dto';
import { Parent } from '../infra/persistence/Parent';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private readonly repository: EntityRepository<Parent>,
    private readonly em: EntityManager,
  ) {}
  async create({ name, age, address }: CreatePersonDto) {
    const student = new Parent(name, age, address);
    await this.em.persistAndFlush(student);
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
