import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from '../infra/controllers/dto/create-template.dto';
import { UpdateTemplateDto } from '../infra/controllers/dto/update-template.dto';
import { TemplateRepository } from '../infra/persistence/template.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateRepository)
    private readonly repository: EntityRepository<TemplateRepository>,
  ) {}
  async create({}: CreateTemplateDto) {
    throw new Error('Not implemented yet');
  }

  async findAll() {
    throw new Error('Not implemented yet');
  }

  async findOne(id: string) {
    throw new Error(`Not implemented yet ${id}`);
  }

  async update(id: string, updateSchoolDto: UpdateTemplateDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto}`);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
