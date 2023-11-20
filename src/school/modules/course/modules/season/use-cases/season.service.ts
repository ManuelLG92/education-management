import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from '../infra/controllers/dto/create-season.dto';
import { UpdateSeasonDto } from '../infra/controllers/dto/update-season.dto';
import { EntityManager } from '@mikro-orm/core';
import { SeasonEntity } from '../infra/persistence/Season.entity';
import { SchoolEntity } from '../../../../../infra/persistence/School.entity';
import { CourseEntity } from '../../../infra/persistence/Course.entity';

@Injectable()
export class SeasonService {
  constructor(private readonly em: EntityManager) {}
  async create(data: CreateSeasonDto) {
    const school = await this.em.findOneOrFail(SchoolEntity, {
      id: data.schoolId,
    });
    const courses = await this.em.find(CourseEntity, {
      id: { $in: data.coursesId },
    });
    const season = new SeasonEntity(
      data.name,
      data.startAt,
      data.endAt,
      school,
    );
    season.courses.add(courses);
    await this.em.insert(season);
    return season;
  }

  async findAll() {
    return this.em.find(
      SeasonEntity,
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
