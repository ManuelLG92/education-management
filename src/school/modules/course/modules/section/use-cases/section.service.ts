import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from '../infra/controllers/dto/create-section.dto';
import { UpdateSectionDto } from '../infra/controllers/dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionRepository } from '../infra/persistence/section.repository';
import { Section } from '../domain/section';
import { CourseRepository } from '../../../infra/persistence/course.repository';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionRepository)
    private readonly repository: Repository<SectionRepository>,
  ) {}
  async create(data: CreateSectionDto, course: Array<CourseRepository>) {
    const section = new Section(data.name, course, []);
    await this.repository.save(section.toPersistence());
    return section;
  }

  async findAll() {
    return this.repository.find({
      relations: { courses: true, students: true },
    });
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateSchoolDto: UpdateSectionDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto.name} `);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
