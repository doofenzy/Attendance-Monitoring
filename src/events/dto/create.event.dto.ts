import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  location: string;

  @IsString()
  description: string;
}
