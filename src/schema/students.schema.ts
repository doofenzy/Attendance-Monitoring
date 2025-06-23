import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  section: string;

  @Prop({ required: true })
  fingerPrint: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
