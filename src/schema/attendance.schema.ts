import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Student } from './students.schema';
import { Event } from './events.scema';

@Schema({ timestamps: true })
export class Attendance extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  })
  student: Student;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true })
  event: Event;

  @Prop({ required: true })
  timeOut: boolean;

  @Prop({ required: true })
  timeIn: boolean;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
