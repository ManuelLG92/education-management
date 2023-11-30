import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Logger,
} from '@nestjs/common';
import { StudentService } from '../use-cases/student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Request } from 'express';
import { PaginationDecorator } from '../../../../common/pagination.decorator';
import { PaginationOut } from '../../../../common/list-helper';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll(
    @Req() req: Request,
    // @Query() query: QueryDto,
    @PaginationDecorator([{ prop: 'like' }]) data: PaginationOut,
  ) {
    Logger.log('req query', JSON.stringify(req.query));
    Logger.log('req data', JSON.stringify(data));

    return this.studentService.findAll(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
