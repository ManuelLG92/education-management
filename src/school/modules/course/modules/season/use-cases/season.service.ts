import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from '../infra/controllers/dto/create-season.dto';
import { UpdateSeasonDto } from '../infra/controllers/dto/update-season.dto';
import { Collection, EntityManager } from '@mikro-orm/core';
import { Season } from '../infra/persistence/Season';
import { School } from '../../../../../infra/persistence/School';
import { Course } from '../../../infra/persistence/Course';

@Injectable()
export class SeasonService {
  constructor(private readonly em: EntityManager) {}
  async create(data: CreateSeasonDto) {
    const school = await this.em.findOneOrFail(School, { id: data.schoolId });
    const courses = await this.em.find(Course, { id: { $in: data.coursesId } });
    const season = new Season(
      data.name,
      data.startAt,
      data.endAt,
      school,
      new Collection<Course>(courses),
    );
    await this.em.insert(season);
    return season;
  }

  async findAll() {
    return this.em.find(
      Season,
      {},
      {
        populate: ['school', 'courses'],
      },
    );
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
