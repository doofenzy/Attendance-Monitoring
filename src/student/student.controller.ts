import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Logger,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create.student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Get(':id')
  async getStudent(@Param() param: any) {
    return this.studentService.getStudent(param.id);
  }

  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Delete(':id')
  async deleteStudent(@Param() param: any) {
    return this.studentService.deleteStudent(param.id);
  }

  @Patch(':id')
  async updateStudent(
    @Param() param: any,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.updateStudent(param.id, createStudentDto);
  }
}
