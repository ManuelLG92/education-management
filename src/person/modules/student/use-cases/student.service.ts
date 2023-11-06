import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../infra/controllers/dto/create-student.dto';
import { UpdateStudentDto } from '../infra/controllers/dto/update-student.dto';
import { StudentRepository } from '../infra/persistence/student.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../domain/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly repository: Repository<StudentRepository>,
  ) {}
  async create(data: CreateStudentDto) {
    const student = new Student(data);
    return this.repository.insert(student.toPersistence());
  }

  async findAll() {
    return this.repository.find({
      relations: {
        school: true,
      },
    });
  }

  async findOne(id: string) {
    return this.repository.findOne({
      relations: { parents: true },
      where: { id },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.repository.update(id, updateStudentDto);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
