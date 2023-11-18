import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../infra/controllers/dto/create-student.dto';
import { UpdateStudentDto } from '../infra/controllers/dto/update-student.dto';
import { Collection, EntityManager, EntityRepository } from '@mikro-orm/core';
import { Student as NewStudent } from '../infra/persistence/Student';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Section } from '../../../../school/modules/course/modules/section/infra/persistence/Section';
import { Parent } from '../infra/persistence/Parent';

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
    const section = await this.em.findOne(Section, { id: data.sectionId });
    const parentCollection = new Collection<Parent>(parentsFound);
    const student = new NewStudent(
      data.name,
      data.age,
      data.address,
      section,
      parentCollection,
    );
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
