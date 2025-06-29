import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post(':eventId/:studentId')
  async markAttendance(
    @Param('eventId') eventId: any,
    @Param('studentId') studentId: any,
    @Body() body: any,
  ) {
    return this.attendanceService.markAttendance(eventId, studentId, body);
  }
}
