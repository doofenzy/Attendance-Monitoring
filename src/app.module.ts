import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { EventsModule } from './events/events.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        uri: config.get('database.uri'),
      }),
      inject: [ConfigService],
    }),
    StudentModule,
    EventsModule,
    AttendanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
