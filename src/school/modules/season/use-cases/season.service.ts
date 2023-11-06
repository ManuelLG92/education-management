import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from '../infra/controllers/dto/create-season.dto';
import { UpdateSeasonDto } from '../infra/controllers/dto/update-season.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeasonRepository } from '../infra/persistence/season.repository';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(SeasonRepository)
    private readonly repository: Repository<SeasonRepository>,
  ) {}
  async create({}: CreateSeasonDto) {
    throw new Error('Not implemented yet');
  }

  async findAll() {
    throw new Error('Not implemented yet');
  }

  async findOne(id: string) {
    throw new Error(`Not implemented yet ${id}`);
  }

  async update(id: string, updateSchoolDto: UpdateSeasonDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto}`);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
