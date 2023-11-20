import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from '../infra/controllers/dto/create-school.dto';
import { UpdateSchoolDto } from '../infra/controllers/dto/update-school.dto';
import { AddressEntity } from '../../person/infra/persistence/Address.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { SchoolEntity } from '../infra/persistence/School.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolEntity)
    private readonly repository: EntityRepository<SchoolEntity>,
    private readonly em: EntityManager,
  ) {}
  async create({ name, address }: CreateSchoolDto) {
    const { city, country, postalCode, state, street } = address;
    const school = new SchoolEntity(
      name,
      new AddressEntity(city, country, postalCode.toString(), state, street),
    );
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
