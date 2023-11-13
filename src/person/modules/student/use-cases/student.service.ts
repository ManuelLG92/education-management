import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../infra/controllers/dto/create-student.dto';
import { UpdateStudentDto } from '../infra/controllers/dto/update-student.dto';
import { StudentRepository } from '../infra/persistence/student.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../domain/student';
import { ParentsService } from './parents.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly repository: Repository<StudentRepository>,
    private readonly parentsService: ParentsService,
  ) {}
  async create(data: CreateStudentDto) {
    const parentsId = data.parentsId;
    const parentsFound = await this.parentsService.countByIds(parentsId);
    if (parentsId.length !== parentsFound.length) {
      throw new BadRequestException('Some parent does not exist');
    }
    const student = new Student({ ...data, parents: parentsFound });
    await this.repository.save(student.toPersistence());
    return student;
  }

  async findAll() {
    return this.repository.find({
      relations: {
        parents: true,
        section: true,
      },
    });
  }

  async findOne(id: string) {
    return this.repository.findOne({
      relations: {
        parents: true,
        section: {
          courses: true,
        },
      },
      where: { id },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    // return this.repository.update(id, updateStudentDto);
    return Promise.resolve({ id, updateStudentDto });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
