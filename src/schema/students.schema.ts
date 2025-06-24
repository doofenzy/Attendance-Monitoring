import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  fname: string;

  @Prop({ required: true })
  lname: string;

  @Prop({ required: true })
  course: string;

  @Prop({ required: true })
  block: string;

  @Prop({ required: true })
  fingerPrint: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
