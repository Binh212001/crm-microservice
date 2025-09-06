import { DataSource } from 'typeorm';
import { Product } from '../../api/product/entities/product.entity';
import { Category } from '../../api/category/entities/category.entity';

export class ProductSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product);

    const products = [
      {
        name: 'iPhone 15 Pro',
        description:
          'Latest iPhone with advanced camera system and A17 Pro chip',
        price: 999.99,
        stock: 50,
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Premium Android smartphone with AI-powered features',
        price: 899.99,
        stock: 30,
      },
      {
        name: 'MacBook Pro 16"',
        description: 'Powerful laptop for professionals with M3 Pro chip',
        price: 2499.99,
        stock: 15,
      },
      {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Max Air cushioning',
        price: 150.0,
        stock: 100,
      },
      {
        name: 'Adidas Ultraboost 22',
        description: 'High-performance running shoes with Boost technology',
        price: 180.0,
        stock: 75,
      },
      {
        name: 'The Great Gatsby',
        description: 'Classic American novel by F. Scott Fitzgerald',
        price: 12.99,
        stock: 200,
      },
      {
        name: 'To Kill a Mockingbird',
        description: "Harper Lee's masterpiece about justice and morality",
        price: 14.99,
        stock: 150,
      },
      {
        name: 'Garden Hose 50ft',
        description: 'Heavy-duty expandable garden hose with spray nozzle',
        price: 29.99,
        stock: 80,
      },
      {
        name: 'Plant Pot Set',
        description: 'Set of 3 ceramic plant pots in different sizes',
        price: 45.0,
        stock: 60,
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Non-slip yoga mat with carrying strap',
        price: 35.99,
        stock: 90,
      },
      {
        name: 'Resistance Bands Set',
        description: 'Set of 5 resistance bands for home workouts',
        price: 24.99,
        stock: 120,
      },
      {
        name: 'Vitamin C Serum',
        description: 'Anti-aging vitamin C serum for brightening skin',
        price: 39.99,
        stock: 70,
      },
      {
        name: 'Moisturizing Cream',
        description: 'Hydrating face cream with hyaluronic acid',
        price: 28.99,
        stock: 85,
      },
      {
        name: 'LEGO Creator Set',
        description: 'Buildable LEGO set with 3 different models',
        price: 79.99,
        stock: 40,
      },
      {
        name: 'Board Game: Catan',
        description: 'Strategy board game for 3-4 players',
        price: 49.99,
        stock: 25,
      },
      {
        name: 'Car Phone Mount',
        description: 'Magnetic car phone mount with wireless charging',
        price: 34.99,
        stock: 110,
      },
      {
        name: 'Air Freshener',
        description: 'Long-lasting car air freshener in new car scent',
        price: 8.99,
        stock: 200,
      },
    ];

    for (const productData of products) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
    }

    console.log(`✅ Seeded ${products.length} products`);
  }
}
