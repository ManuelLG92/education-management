import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from '../infra/controllers/dto/create-section.dto';
import { UpdateSectionDto } from '../infra/controllers/dto/update-section.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Section } from '../domain/section';
import { EntityRepository } from '@mikro-orm/core';
import { Course } from '../../../infra/persistence/Course';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly repository: EntityRepository<Section>,
  ) {}
  async create(data: CreateSectionDto, course: Array<Course>) {
    const section = new Section(data.name, course, []);
    await this.repository.getEntityManager().persistAndFlush(section);
    return section;
  }

  async findAll() {
    return this.repository.findAll({
      populate: ['course', 'students'],
    });
  }

  async findOne(id: string) {
    return this.repository.findOne({ id });
  }

  async update(id: string, updateSchoolDto: UpdateSectionDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto.name} `);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
