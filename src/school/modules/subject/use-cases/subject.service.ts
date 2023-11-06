import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from '../infra/controllers/dto/create-subject.dto';
import { UpdateSubjectDto } from '../infra/controllers/dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectRepository } from '../infra/persistence/subject.repository';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectRepository)
    private readonly repository: Repository<SubjectRepository>,
  ) {}
  async create({}: CreateSubjectDto) {
    throw new Error('Not implemented yet');
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
