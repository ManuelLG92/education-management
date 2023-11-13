import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../infra/controllers/dto/create-course.dto';
import { UpdateCourseDto } from '../infra/controllers/dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseRepository } from '../infra/persistence/course.repository';
import { Course } from '../domain/course';
import { Subject } from '../modules/subject/domain/subject';
import { Season } from '../modules/season/domain/season';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private readonly repository: Repository<CourseRepository>,
  ) {}
  async create(
    data: CreateCourseDto,
    subjects: Array<Subject>,
    seasons: Array<Season>,
  ) {
    const entity = new Course(data.name, subjects, seasons, []);
    await this.repository.insert(entity.toPersistence());
    return this.findOne(entity.id);
  }

  async findAll() {
    return this.repository.find({
      relations: { subjects: true, seasons: true, sections: true },
    });
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateSchoolDto: UpdateCourseDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto}`);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
