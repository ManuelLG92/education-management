import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from '../infra/controllers/dto/create-section.dto';
import { UpdateSectionDto } from '../infra/controllers/dto/update-section.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { SectionEntity } from '../infra/persistence/Section.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionEntity)
    private readonly repository: EntityRepository<SectionEntity>,
    private readonly em: EntityManager,
  ) {}
  async create(data: CreateSectionDto) {
    const section = new SectionEntity(data.name);
    await this.em.persistAndFlush(section);
    return section;
  }

  async findAll() {
    return this.repository.findAll({
      populate: ['courses', 'students'],
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
