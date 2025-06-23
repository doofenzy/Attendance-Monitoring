import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { EventsModule } from './events/events.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [StudentModule, EventsModule, AttendanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
