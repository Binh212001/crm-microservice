import { DataSource } from 'typeorm';
import { AppDataSource } from '../datasource';
import { CategorySeed } from './category.seed';
import { ProductSeed } from './product.seed';

export class SeedRunner {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = AppDataSource;
  }

  public async run(): Promise<void> {
    try {
      console.log('🌱 Starting database seeding...');

      // Initialize the data source
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
        console.log('📊 Database connection established');
      }

      // Run all seeds
      await this.runSeeds();

      console.log('✅ Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Error during seeding:', error);
      throw error;
    } finally {
      // Close the data source connection
      if (this.dataSource.isInitialized) {
        await this.dataSource.destroy();
        console.log('🔌 Database connection closed');
      }
    }
  }

  private async runSeeds(): Promise<void> {
    const seeds = [
      new CategorySeed(),
      new ProductSeed(),
      // Add more seeds here as you create them
    ];

    for (const seed of seeds) {
      console.log(`🔄 Running ${seed.constructor.name}...`);
      await seed.run(this.dataSource);
    }
  }
}

// Allow running this file directly
if (require.main === module) {
  const seedRunner = new SeedRunner();
  seedRunner
    .run()
    .then(() => {
      console.log('🎉 Seeding process finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    });
}
