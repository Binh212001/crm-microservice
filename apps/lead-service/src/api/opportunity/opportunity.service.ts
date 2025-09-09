import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { FindOptionsWhere, Like } from 'typeorm';
import {
  pagination,
  PaginationResponse,
} from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import {
  CreateOpportunityDto,
  OpportunityReqDto,
  OpportunityResDto,
  UpdateOpportunityDto,
} from './dto';
import { Opportunity } from './entities/opportunity.entity';
import { OpportunityStatus } from './enums/opportunity-status';
import { OpportunityRepository } from './repositories/opportunity.repository';
import { OpportunityLine } from './entities/opportunity-line.entity';
import { OpportunityLineRepository } from './repositories/opportunity-line.repository';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OpportunityService {
  constructor(
    private readonly opportunityRepository: OpportunityRepository,
    private readonly opportunityLineRepository: OpportunityLineRepository,
    @Inject('PRODUCT_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  @Transactional()
  async create(dto: CreateOpportunityDto): Promise<Opportunity> {
    const existing = await this.opportunityRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException(
        `Opportunity with email ${dto.email} already exists`,
      );
    }
    if (dto.opportunityLines) {
      const productIds = dto.opportunityLines.map((item) => item.productId);
      const product = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'get_product_by_ids', queue: 'PRODUCT_QUEUE' },
          productIds,
        ),
      );
      if (!product || product.length !== productIds.length) {
        throw new NotFoundException(`Product with IDs ${productIds} not found`);
      }
    }

    const opportunity = this.opportunityRepository.create({
      ...dto,
      status: dto.status,
    });
    const opportunitySaved = await this.opportunityRepository.save(opportunity);

    await this.opportunityLineRepository.save(
      dto.opportunityLines.map((item) =>
        this.opportunityLineRepository.create({
          ...item,
          opportunity: opportunitySaved,
        }),
      ),
    );
    return opportunitySaved;
  }

  async findAll(
    req: OpportunityReqDto,
  ): Promise<PaginationResponse<OpportunityResDto>> {
    const { page, limit, order, name, email, status } = req;
    const where: FindOptionsWhere<Opportunity> = {};

    if (name) where.name = Like(`%${name}%`);
    if (email) where.email = Like(`%${email}%`);
    if (status) where.status = status as OpportunityStatus;

    const { data, total } = await pagination({
      page,
      limit,
      repository: this.opportunityRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });

    const productIds: number[] = [];
    data.forEach((opportunity) => {
      opportunity.opportunityLines.forEach((item: OpportunityLine) => {
        productIds.push(item.productId);
      });
    });

    const products = await firstValueFrom(
      this.clientProxy.send(
        { cmd: 'get_product_by_ids', queue: 'PRODUCT_QUEUE' },
        productIds,
      ),
    );

    const opportunityResDto = data.map((opportunity) => {
      // get productIds from opportunityLines
      const productIds = opportunity.opportunityLines.map(
        (item: OpportunityLine) => item.productId,
      );
      // get products by productIds in opportunityLines
      const product = products.filter((product: any) =>
        productIds.includes(product.id),
      );
      // assign products to opportunity
      return plainToInstance(OpportunityResDto, {
        ...opportunity,
        products: product,
      });
    });

    return plainToInstance(PaginationResponse<OpportunityResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,
      total,
      data: opportunityResDto,
    });
  }

  async findOne(id: number): Promise<OpportunityResDto> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
    });
    if (!opportunity)
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    const productIds = opportunity.opportunityLines.map((o) => o.productId);
    const products = await firstValueFrom(
      this.clientProxy.send(
        { cmd: 'get_product_by_ids', queue: 'PRODUCT_QUEUE' },
        productIds,
      ),
    );
    return plainToInstance(OpportunityResDto, { ...opportunity, products });
  }

  async update(
    id: number,
    dto: UpdateOpportunityDto,
  ): Promise<UpdateDeleteResDto> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
    });
    if (!opportunity)
      throw new NotFoundException(`Opportunity with ID ${id} not found`);

    if (dto.email && dto.email !== opportunity.email) {
      const existing = await this.opportunityRepository.findOne({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException(
          `Opportunity with email ${dto.email} already exists`,
        );
      }
    }

    if (dto.opportunityLines) {
      const productIds = dto.opportunityLines.map((item) => item.productId);
      const product = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'get_product_by_ids', queue: 'PRODUCT_QUEUE' },
          productIds,
        ),
      );
      if (!product || product.length !== productIds.length) {
        throw new NotFoundException(`Product with ID ${productIds} not found`);
      }
      await this.opportunityLineRepository.remove(opportunity.opportunityLines);
      await this.opportunityLineRepository.save(
        dto.opportunityLines.map((item) =>
          this.opportunityLineRepository.create({
            ...item,
            opportunity: opportunity,
          }),
        ),
      );
    }

    Object.assign(opportunity, dto);
    const saved = await this.opportunityRepository.save(opportunity);
    return plainToInstance(UpdateDeleteResDto, { id: saved.id });
  }

  async updateStatus(
    id: number,
    status: OpportunityStatus,
  ): Promise<UpdateDeleteResDto> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
    });
    if (!opportunity)
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    opportunity.status = status;
    const saved = await this.opportunityRepository.save(opportunity);
    return plainToInstance(UpdateDeleteResDto, { id: saved.id });
  }

  async remove(id: number): Promise<UpdateDeleteResDto> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
    });
    if (!opportunity)
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    await this.opportunityRepository.remove(opportunity);
    return plainToInstance(UpdateDeleteResDto, { id: opportunity.id });
  }
}
