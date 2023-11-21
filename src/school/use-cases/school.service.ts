import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from '../controllers/dto/create-school.dto';
import { UpdateSchoolDto } from '../controllers/dto/update-school.dto';
import { Address } from '../../person/entity/address';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { School } from '../entity/school';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly repository: EntityRepository<School>,
    private readonly em: EntityManager,
  ) {}
  async create({ name, address }: CreateSchoolDto) {
    const school = new School({
      name,
      address: new Address(address),
      seasons: [],
      teachers: [],
    });
    await this.em.persistAndFlush(school);
    return school;
  }

  async findAll() {
    return this.repository.findAll({
      populate: ['seasons'],
    });
  }

  async findOne(id: string) {
    const result = await this.repository.findOne(
      {
        id,
      },
      {
        populate: ['seasons'],
      },
    );

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
    return this.repository.nativeUpdate({ id }, updateSchoolDto);
  }

  async remove(id: string) {
    await this.repository.nativeDelete({ id });
  }
}
