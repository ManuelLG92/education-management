import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../controllers/dto/create-student.dto';
import { UpdateStudentDto } from '../controllers/dto/update-student.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Section } from '../../../../school/modules/season/modules/course/modules/section/entity/section';
import { Parent } from '../entity/parent';
import { Student } from '../entity/student';

@Injectable()
export class StudentService {
  private readonly repo: EntityRepository<Student>;
  constructor(
    @InjectRepository(Student)
    private readonly repository: EntityRepository<Student>,
    private readonly em: EntityManager,
  ) {
    this.repo = em.getRepository(Student);
  }
  async create(data: CreateStudentDto) {
    const parentsId = data.parentsId;
    const parentsFound = await this.em.find(
      Parent,
      {
        id: { $in: parentsId },
      },
      {},
    );

    if (parentsId.length !== parentsFound.length) {
      throw new BadRequestException('Some parent does not exist');
    }
    const section = await this.em.findOne(Section, {
      id: data.sectionId,
    });
    const student = new Student({ ...data, section, parents: parentsFound });
    await this.em.persistAndFlush(student);
    return student;
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
      { ...(like && { name: { $ilike: `%${like}%` } }) },
      {
        offset,
        limit: limiter,
        populate: ['parents', 'section', 'section.courses'],
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
      {
        populate: ['parents', 'section'],
      },
    );
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    // return this.repository.update(id, updateStudentDto);

    await this.repo.nativeUpdate({ id }, updateStudentDto);
  }

  async remove(id: string) {
    await this.repository.nativeDelete({ id });
  }
}
