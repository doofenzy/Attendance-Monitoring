import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/schema/students.schema';
import { CreateStudentDto } from './dto/create.student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const { fname, lname, course, block, fingerPrint } = createStudentDto;

    try {
      const fingerPrintExists = await this.studentModel.findOne({
        fingerPrint,
      });

      if (fingerPrintExists) {
        throw new BadRequestException('Student already exists');
      }

      const student = await this.studentModel.create({
        fname,
        lname,
        course,
        block,
        fingerPrint,
      });
      return student;
    } catch (error) {
      throw new Error('Error checking fingerprint', error.message);
    }
  }

  async getStudent(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }
      const student = await this.studentModel.findById(id);

      if (!student) {
        throw new BadRequestException('Student not found');
      }

      return student;
    } catch (error) {
      throw new Error('Error fetching student', error.message);
    }
  }

  async getAllStudents() {
    try {
      const students = await this.studentModel
        .find()
        .sort({ createdAt: -1 })
        .select('-__v -createdAt -updatedAt');

      return students;
    } catch (error) {
      throw new Error('Error fetching all students', error.message);
    }
  }

  async deleteStudent(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }

      const student = await this.studentModel.findByIdAndDelete(id);
      if (!student) {
        throw new BadRequestException('Student not found');
      }

      return { message: 'Student deleted successfully', student };
    } catch (error) {
      throw new Error('Error deleting student', error.message);
    }
  }

  async updateStudent(id: any, createStudentDto: CreateStudentDto) {
    const { fname, lname, course, block, fingerPrint } = createStudentDto;

    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }

      const student = await this.studentModel.findByIdAndUpdate(
        id,
        { fname, lname, course, block, fingerPrint },
        { new: true },
      );

      return student;
    } catch (error) {
      throw new Error('Error updating student', error.message);
    }
  }
}
