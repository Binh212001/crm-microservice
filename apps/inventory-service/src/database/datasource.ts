import { DataSource } from 'typeorm';
import { Category } from '../api/category/entities/category.entity';
import { Product } from '../api/product/entities/product.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '25432'),
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'inventory',
  entities: [Category, Product],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: false,
});
