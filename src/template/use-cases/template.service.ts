import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from '../controllers/dto/create-template.dto';
import { UpdateTemplateDto } from '../controllers/dto/update-template.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Template } from '../entity/template.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: EntityRepository<Template>,
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
