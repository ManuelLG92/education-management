import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from '../infra/controllers/dto/create-school.dto';
import { UpdateSchoolDto } from '../infra/controllers/dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolRepository } from '../infra/persistence/school.repository';
import { School } from '../domain/school';
import { Address } from '../../person/infra/persistence/Address';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolRepository)
    private readonly repository: Repository<SchoolRepository>,
  ) {}
  async create({ name, address }: CreateSchoolDto) {
    const { city, country, postalCode, state, street } = address;
    const school = new School(
      name,
      new Address(city, country, postalCode.toString(), state, street),
      [],
    );
    await this.repository.insert(school);
    return school;
  }

  async findAll() {
    return this.repository.find({
      relations: {
        seasons: true,
      },
    });
  }

  async findOne(id: string) {
    const result = await this.repository.findOne({
      where: { id },
      relations: { seasons: true },
    });

    return {
      id: result.id,
      name: result.name,
      seasons: result.seasons.map((student) => ({
        id: student.id,
        name: student.name,
      })),
    };
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    return this.repository.update({ id }, updateSchoolDto);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
