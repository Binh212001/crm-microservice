import { Expose } from 'class-transformer';

export class UpdateDeleteResDto {
  @Expose()
  id: number;
}
