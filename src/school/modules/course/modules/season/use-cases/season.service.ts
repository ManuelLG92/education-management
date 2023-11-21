import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from '../controllers/dto/create-season.dto';
import { UpdateSeasonDto } from '../controllers/dto/update-season.dto';
import { EntityManager } from '@mikro-orm/core';
import { Season } from '../entity/season';
import { Course } from '../../../entity/course';
import { School } from '../../../../../entity/school';

@Injectable()
export class SeasonService {
  constructor(private readonly em: EntityManager) {}
  async create({ name, coursesId, startAt, schoolId, endAt }: CreateSeasonDto) {
    const school = await this.em.findOneOrFail(School, {
      id: schoolId,
    });
    const courses = await this.em.find(Course, {
      id: { $in: coursesId },
    });
    const season = new Season({ name, courses, school, startAt, endAt });
    season.courses.add(courses);
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
