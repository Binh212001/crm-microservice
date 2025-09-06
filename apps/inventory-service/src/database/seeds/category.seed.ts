import { DataSource } from 'typeorm';
import { Category } from '../../api/category/entities/category.entity';

export class CategorySeed {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    const categories = [
      {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
      },
      {
        name: 'Clothing',
        description: 'Apparel and fashion items',
      },
      {
        name: 'Books',
        description: 'Books and educational materials',
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
      },
      {
        name: 'Sports & Outdoors',
        description: 'Sports equipment and outdoor gear',
      },
      {
        name: 'Health & Beauty',
        description: 'Health and beauty products',
      },
      {
        name: 'Toys & Games',
        description: 'Toys, games, and entertainment',
      },
      {
        name: 'Automotive',
        description: 'Car parts and automotive accessories',
      },
    ];

    for (const categoryData of categories) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
    }

    console.log(`✅ Seeded ${categories.length} categories`);
  }
}
