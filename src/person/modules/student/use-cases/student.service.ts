import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../controllers/dto/create-student.dto';
import { UpdateStudentDto } from '../controllers/dto/update-student.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Student as NewStudent } from '../entity/student';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Section } from '../../../../school/modules/season/modules/course/modules/section/entity/section';
import { Parent } from '../entity/parent';

@Injectable()
export class StudentService {
  private readonly repo: EntityRepository<NewStudent>;
  constructor(
    @InjectRepository(NewStudent)
    private readonly repository: EntityRepository<NewStudent>,
    private readonly em: EntityManager,
  ) {
    this.repo = em.getRepository(NewStudent);
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
    const student = new NewStudent({ ...data, section, parents: parentsFound });
    // parentsFound.forEach((parent) => student.parents.add(parent));
    await this.em.persistAndFlush(student);
    return student;
  }

  async findAll() {
    return this.repository.find(
      {},
      {
        populate: ['parents', 'section'],
      },
    );
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
