import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../infra/controllers/dto/create-course.dto';
import { UpdateCourseDto } from '../infra/controllers/dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseRepository } from '../infra/persistence/course.repository';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private readonly repository: Repository<CourseRepository>,
  ) {}
  async create({}: CreateCourseDto) {
    throw new Error('Not implemented yet');
  }

  async findAll() {
    throw new Error('Not implemented yet');
  }

  async findOne(id: string) {
    throw new Error(`Not implemented yet ${id}`);
  }

  async update(id: string, updateSchoolDto: UpdateCourseDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto}`);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
