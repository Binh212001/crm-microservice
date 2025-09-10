import { AbstractEntity } from '../entities/abstract.entity';
import { Repository } from 'typeorm';

export abstract class BaseRepository<
  Entity extends AbstractEntity,
> extends Repository<Entity> {}
