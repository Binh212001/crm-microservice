import { Expose } from 'class-transformer';

export class TokenDto {
  @Expose()
  userId: number;

  @Expose()
  token: string;

  @Expose()
  refreshToken: string;
}
