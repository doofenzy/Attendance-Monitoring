import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  fname: string;

  @IsString()
  @IsNotEmpty()
  lname: string;

  @IsString()
  @IsNotEmpty()
  course: string;

  @IsString()
  @IsNotEmpty()
  block: string;

  @IsString()
  @IsNotEmpty()
  fingerPrint: string;
}
