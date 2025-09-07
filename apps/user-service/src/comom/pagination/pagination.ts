import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepository } from '../../database/repositories/base.repository';
import { AbstractEntity } from '../../database/entities/abstract.entity';

import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class PaginationReq {
  @IsNumber()
  page?: number = 1;
  @IsNumber()
  limit?: number = 20;
  @IsOptional()
  @IsString()
  order?: string;
}

export class PaginationResponse<T> {
  @Expose()
  page: number;
  @Expose()
  limit: number;
  @Expose()
  total: number;
  @Expose()
  data: T;
}

export const pagination = async <T extends AbstractEntity>({
  page = 1,
  limit = 20,
  repository,
  order = { createdAt: 'DESC' },
  relations,
  where,
}: {
  page?: number;
  limit?: number;
  repository: Repository<any>;
  order?: { [key: string]: string };
  relations?: string[];
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
}) => {
  return {
    total: await repository.count(),
    data: await repository.find({
      skip: (page - 1) * limit,
      take: limit,
      order,
      relations,
      where: where as
        | FindOptionsWhere<BaseRepository<T>>
        | FindOptionsWhere<BaseRepository<T>>[],
    }),
  };
};
