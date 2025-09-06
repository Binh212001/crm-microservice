import { DataSource } from 'typeorm';
import { Category } from '../../api/category/entities/category.entity';

export class CategorySeed {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    const categories = [
      {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        name: 'Clothing',
        description: 'Apparel and fashion items',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        name: 'Books',
        description: 'Books and educational materials',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        name: 'Sports & Outdoors',
        description: 'Sports equipment and outdoor gear',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        name: 'Health & Beauty',
        description: 'Health and beauty products',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
        name: 'Toys & Games',
        description: 'Toys, games, and entertainment',
        createdBy: 'admin',
        updatedBy: 'admin',
        deletedBy: 'admin',
      },
      {
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
