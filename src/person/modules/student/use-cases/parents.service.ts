import { Injectable } from '@nestjs/common';
import { UpdateStudentDto } from '../infra/controllers/dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ParentRepository } from '../infra/persistence/parent.repository';
import { Parent } from '../domain/parent';
import { CreatePersonDto } from '../../../create-person.dto';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(ParentRepository)
    private readonly repository: Repository<ParentRepository>,
  ) {}
  async create(data: CreatePersonDto) {
    const student = new Parent(data);
    return this.repository.insert(student.toPersistence());
  }

  async countByIds(ids: string[]) {
    return this.repository.find({
      where: {
        id: In(ids),
      },
    });
  }
  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    // return this.repository.update(id, updateStudentDto);
    return Promise.resolve({ id, updateStudentDto });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
