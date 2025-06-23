import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [StudentModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
