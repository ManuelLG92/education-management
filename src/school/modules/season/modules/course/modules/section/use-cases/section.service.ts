import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSectionDto } from '../controllers/dto/create-section.dto';
import { UpdateSectionDto } from '../controllers/dto/update-section.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Section } from '../entity/section';
import { Course } from '../../../entity/course';
import { Student } from '../../../../../../../../person/modules/student/entity/student';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly repository: EntityRepository<Section>,
    private readonly em: EntityManager,
  ) {}
  async create(data: CreateSectionDto) {
    const courses = await this.em.findOne(Course, {
      id: data.courseId,
    });
    if (!courses) {
      throw new BadRequestException(`Some course ids are invalid`);
    }

    const students = await this.em.find(Student, {
      id: { $in: data.studentIds },
    });
    if (students.length !== data.studentIds.length) {
      throw new BadRequestException(`Some student ids are invalid`);
    }
    const section = new Section({
      name: data.name,
      courses: [courses],
      students,
    });
    await this.em.persistAndFlush(section);
    return section;
  }

  async findAll({
    page,
    limit,
    like,
  }: {
    page: number;
    limit: number;
    like?: string;
  }) {
    const pager = page ?? 1;
    const limiter = limit ?? 2;
    const offset = (pager - 1) * limiter;
    const [data, count] = await this.repository.findAndCount(
      {
        ...(like && { name: { $like: `%${like}%` } }),
      },
      {
        populate: ['courses', 'students'],
        orderBy: { createdAt: 'DESC' },
        limit: limiter,
        offset,
      },
    );
    const totalPages = Math.ceil(count / limiter);
    return {
      data,
      count: totalPages,
      currentPage: pager,
    };
  }

  async findOne(id: string) {
    return this.repository.findOne(
      { id },
      { populate: ['courses', 'students'] },
    );
  }

  async update(id: string, updateSchoolDto: UpdateSectionDto) {
    throw new Error(`Not implemented yet ${id} - ${updateSchoolDto.name} `);
  }

  async remove(id: number) {
    throw new Error(`Not implemented yet ${id}`);
  }
}
