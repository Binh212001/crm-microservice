import { DataSource } from 'typeorm';
import { Category } from '../../api/category/entities/category.entity';

export class CategorySeed {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);
    // Check if categories already exist to prevent reseeding
    const existingCount = await categoryRepository.count();
    console.log('existingCount', existingCount);
    if (existingCount > 0) {
      console.log('✅ Categories already seeded');
      return;
    }

    const categories = [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        id: 2,
        name: 'Clothing',
        description: 'Apparel and fashion items',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        id: 3,
        name: 'Books',
        description: 'Books and educational materials',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        id: 4,
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        id: 5,
        name: 'Sports & Outdoors',
        description: 'Sports equipment and outdoor gear',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        id: 6,
        name: 'Health & Beauty',
        description: 'Health and beauty products',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        id: 7,
        name: 'Toys & Games',
        description: 'Toys, games, and entertainment',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        id: 8,
        name: 'Automotive',
        description: 'Car parts and automotive accessories',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
    ];

    for (const categoryData of categories) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
    }

    console.log(`✅ Seeded ${categories.length} categories`);
  }
}
