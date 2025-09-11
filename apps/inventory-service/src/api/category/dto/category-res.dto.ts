import { Expose } from 'class-transformer';

export class CategoryResDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description: string;
}
