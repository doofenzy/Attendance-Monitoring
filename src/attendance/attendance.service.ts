import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Attendance, AttendanceSchema } from '../schema/attendance.schema';
import { Student, StudentSchema } from '../schema/students.schema';
import { Event, EventSchema } from 'src/schema/events.scema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async markAttendance(eventId: any, studentId: any, body: any) {
    const fingerPrint = body;

    try {
      const checkFingerPrint = await this.studentModel.findOne({ fingerPrint });
      if (!checkFingerPrint) {
        throw new BadRequestException(
          'Student not found with this fingerprint',
        );
      }

      const date = new Date();
    } catch (error) {
      throw new Error(`Error : ${error.message}`);
    }
  }

  async getAttendanceByEvent(eventId: any) {}
  async getAttendanceByStudent(studentId: any) {}
  async getAttendanceByEventAndStudent(eventId: any, studentId: any) {}

  async getAllAttendance() {
    try {
      const attendanceRecords = await this.attendanceModel
        .find()
        .sort({ createdAt: -1 })
        .select('-__v -createdAt -updatedAt');
      return attendanceRecords;
    } catch (error) {
      throw new Error(`Error fetching attendance records: ${error.message}`);
    }
  }
}
