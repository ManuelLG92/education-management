import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from '../infra/controllers/dto/create-template.dto';
import { UpdateTemplateDto } from '../infra/controllers/dto/update-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateRepository } from '../infra/persistence/template.repository';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateRepository)
    private readonly repository: Repository<TemplateRepository>,
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
