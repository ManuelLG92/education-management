import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from '../infra/controllers/dto/create-teacher.dto';
import { UpdateTeacherDto } from '../infra/controllers/dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherRepository } from '../infra/persistence/teacher.repository';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private readonly repository: Repository<TeacherRepository>,
  ) {}
  async create({}: CreateTeacherDto) {
    throw new Error('Not implemented yet');
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