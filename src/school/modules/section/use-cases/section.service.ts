import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from '../infra/controllers/dto/create-section.dto';
import { UpdateSectionDto } from '../infra/controllers/dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionRepository } from '../infra/persistence/section.repository';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionRepository)
    private readonly repository: Repository<SectionRepository>,
  ) {}
  async create(data: CreateSectionDto) {
    throw new Error(`Not implemented yet. ${data.name}`);
  }

  async findAll() {
    throw new Error('Not implemented yet');
  }

  async findOne(id: string) {
    throw new Error(`Not implemented yet ${id}`);
  }

  async update(id: string, updateSchoolDto: UpdateSectionDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto.name} `);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
