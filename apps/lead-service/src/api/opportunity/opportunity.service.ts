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

@Injectable()
export class OpportunityService {
  constructor(
    private readonly opportunityRepository: OpportunityRepository,
    @Inject('PRODUCT_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  async create(dto: CreateOpportunityDto): Promise<Opportunity> {
    const existing = await this.opportunityRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException(
        `Opportunity with email ${dto.email} already exists`,
      );
    }

    if (dto.productId) {
      const product = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'get_product_by_id', queue: 'PRODUCT_QUEUE' },
          dto.productId,
        ),
      );
      if (!product) {
        throw new BadRequestException(
          `Product with ID ${dto.productId} not found`,
        );
      }
    }

    const opportunity = this.opportunityRepository.create({
      ...dto,
      status: dto.status || OpportunityStatus.QUALIFIED,
    });
    return await this.opportunityRepository.save(opportunity);
  }

  async findAll(
    req: OpportunityReqDto,
  ): Promise<PaginationResponse<OpportunityResDto>> {
    const { page, limit, order, name, email, status, leadId } = req;
    const where: FindOptionsWhere<Opportunity> = {};

    if (name) where.name = Like(`%${name}%`);
    if (email) where.email = Like(`%${email}%`);
    if (status) where.status = status as OpportunityStatus;
    if (leadId) where.leadId = leadId;

    const { data, total } = await pagination({
      page,
      limit,
      repository: this.opportunityRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });

    const productIds = data.map((o) => o.productId).filter(Boolean);
    const products = productIds.length
      ? await firstValueFrom(
          this.clientProxy.send(
            { cmd: 'get_product_by_ids', queue: 'PRODUCT_QUEUE' },
            productIds,
          ),
        )
      : [];

    const res = data.map((o) => {
      const product = products.find((p: any) => p.id === o.productId);
      return plainToInstance(OpportunityResDto, { ...o, product });
    });

    return plainToInstance(PaginationResponse<OpportunityResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,
      total,
      data: res,
    });
  }

  async findOne(id: number): Promise<OpportunityResDto> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
    });
    if (!opportunity)
      throw new NotFoundException(`Opportunity with ID ${id} not found`);

    const product =
      opportunity.productId &&
      (await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'get_product_by_id', queue: 'PRODUCT_QUEUE' },
          opportunity.productId,
        ),
      ));

    return plainToInstance(OpportunityResDto, { ...opportunity, product });
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

    if (dto.productId) {
      const product = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'get_product_by_id', queue: 'PRODUCT_QUEUE' },
          dto.productId,
        ),
      );
      if (!product)
        throw new BadRequestException(
          `Product with ID ${dto.productId} not found`,
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
