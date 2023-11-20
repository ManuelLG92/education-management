import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../infra/controllers/dto/create-student.dto';
import { UpdateStudentDto } from '../infra/controllers/dto/update-student.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { StudentEntity as NewStudent } from '../infra/persistence/Student.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { SectionEntity } from '../../../../school/modules/course/modules/section/infra/persistence/Section.entity';
import { ParentEntity } from '../infra/persistence/Parent.entity';

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
      ParentEntity,
      {
        id: { $in: parentsId },
      },
      {},
    );

    if (parentsId.length !== parentsFound.length) {
      throw new BadRequestException('Some parent does not exist');
    }
    const section = await this.em.findOne(SectionEntity, {
      id: data.sectionId,
    });
    const student = new NewStudent(data.name, data.age, data.address, section);
    parentsFound.forEach((parent) => student.parents.add(parent));
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
