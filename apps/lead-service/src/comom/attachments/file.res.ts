import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FileResDto {
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsNumber()
  @IsNotEmpty()
  size: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  extension: string;
  @IsString()
  @IsNotEmpty()
  path: string;
}
