import { DataSource } from 'typeorm';
import { Attribute } from '../../api/variant/entities/attribute.entity';
import { Value } from '../../api/variant/entities/value.entity';

export class VariantSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const attributeRepository = dataSource.getRepository(Attribute);
    const valueRepository = dataSource.getRepository(Value);
    // Check if categories already exist to prevent reseeding
    const existingCount = await attributeRepository.count();
    console.log('existingCount', existingCount);
    if (existingCount > 0) {
      console.log('✅ Attributes already seeded');
      return;
    }

    const attributes = [
      {
        id: 1,
        name: 'Color',
        values: [
          { id: 1, name: 'Red' },
          { id: 2, name: 'Blue' },
          { id: 3, name: 'Green' },
        ],
      },
      {
        id: 2,
        name: 'Size',
        values: [
          { id: 4, name: 'Small' },
          { id: 5, name: 'Medium' },
          { id: 6, name: 'Large' },
        ],
      },
      {
        id: 3,
        name: 'Material',
        values: [
          { id: 7, name: 'Cotton' },
          { id: 8, name: 'Polyester' },
          { id: 9, name: 'Wool' },
        ],
      },
    ];

    await Promise.all(
      attributes.map(async (attribute) => {
        const attributeEntity = attributeRepository.create({
          id: attribute.id,
          name: attribute.name,
        });
        const attributeSaved = await attributeRepository.save(attributeEntity);
        for (const value of attribute.values) {
          const valueEntity = valueRepository.create({
            id: value.id,
            name: value.name,
            attribute: attributeSaved,
          });
          await valueRepository.save(valueEntity);
        }
      }),
    );

    console.log(`✅ Seeded ${attributes.length} attributes`);
  }
}
