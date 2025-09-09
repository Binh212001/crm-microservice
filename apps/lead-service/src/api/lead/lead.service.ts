import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { CreateLeadDto, UpdateLeadDto, LeadReqDto, LeadResDto } from './dto';
import { Lead } from './entities/lead.entity';
import { LeadRepository } from './repositories/lead.repository';
import { FindOptionsWhere, Like } from 'typeorm';
import {
  pagination,
  PaginationResponse,
} from '../../comom/pagination/pagination';
import { LeadStatus } from './enums/lead-status';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LeadLineRepository } from './repositories/lead-line.repository';
import { LeadLine } from './entities/lead-line.entity';

@Injectable()
export class LeadService {
  constructor(
    private leadRepository: LeadRepository,
    private leadLineRepository: LeadLineRepository,
    @Inject('PRODUCT_SERVICE')
    private clientProxy: ClientProxy,
  ) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    // Check if lead with email already exists
    const existingLead = await this.leadRepository.findOne({
      where: { email: dto.email },
    });

    if (existingLead) {
      throw new ConflictException(
        `Lead with email ${dto.email} already exists`,
      );
    }
    if (dto.leadLines && dto.leadLines.length > 0) {
      const productIds = dto.leadLines.map((item) => item.productId);
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

    const newLead = this.leadRepository.create({
      ...dto,
      status: dto.status || LeadStatus.NEW,
    });

    const leadSaved = await this.leadRepository.save(newLead);
    //Save lead lines
    if (dto.leadLines && dto.leadLines.length > 0) {
      await this.leadLineRepository.save(
        dto.leadLines.map((item) =>
          this.leadLineRepository.create({
            productId: item.productId,
            lead: leadSaved,
          }),
        ),
      );
    }

    return leadSaved;
  }

  async findAll(
    leadReqDto: LeadReqDto,
  ): Promise<PaginationResponse<LeadResDto>> {
    const { page, limit, order, name, email, company, status } = leadReqDto;
    const where: FindOptionsWhere<Lead> = {};

    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (email) {
      where.email = Like(`%${email}%`);
    }

    if (company) {
      where.company = Like(`%${company}%`);
    }

    if (status) {
      where.status = status as LeadStatus;
    }

    const { data, total } = await pagination({
      page,
      limit,
      repository: this.leadRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });

    const productIds: number[] = [];
    data.forEach((lead) => {
      lead.leadLines.forEach((item: LeadLine) => {
        productIds.push(item.productId);
      });
    });

    const products = await firstValueFrom(
      this.clientProxy.send(
        { cmd: 'get_product_by_ids', queue: 'PRODUCT_QUEUE' },
        productIds,
      ),
    );

    const leadResDto = data.map((lead) => {
      // get productIds from leadLines and get products by productIds
      const productIds = lead.leadLines.map((item: LeadLine) => item.productId);
      const product = products.filter((product: any) =>
        productIds.includes(product.id),
      );
      // assign products to lead
      return plainToInstance(LeadResDto, {
        ...lead,
        products: product,
      });
    });

    return plainToInstance(PaginationResponse<LeadResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,
      total,
      data: leadResDto,
    });
  }

  async findOne(id: number): Promise<LeadResDto> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    const products = await firstValueFrom(
      this.clientProxy.send(
        { cmd: 'get_product_by_ids', queue: 'PRODUCT_QUEUE' },
        lead.leadLines.map((item) => item.productId),
      ),
    );

    return plainToInstance(LeadResDto, {
      ...lead,
      products,
    });
  }

  async update(
    id: number,
    updateLeadDto: UpdateLeadDto,
  ): Promise<UpdateDeleteResDto> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    if (updateLeadDto.leadLines && updateLeadDto.leadLines.length > 0) {
      const productIds = updateLeadDto.leadLines.map((item) => item.productId);
      const product = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'get_product_by_ids', queue: 'PRODUCT_QUEUE' },
          productIds,
        ),
      );

      await this.leadLineRepository.save(
        updateLeadDto.leadLines.map((item) =>
          this.leadLineRepository.create({
            productId: item.productId,
            lead: lead,
          }),
        ),
      );
    }

    Object.assign(lead, updateLeadDto);
    const savedLead = await this.leadRepository.save(lead);
    return plainToInstance(UpdateDeleteResDto, { id: savedLead.id });
  }

  async remove(id: number): Promise<UpdateDeleteResDto> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    await this.leadRepository.remove(lead);
    return plainToInstance(UpdateDeleteResDto, { id: lead.id });
  }

  async updateStatus(
    id: number,
    status: LeadStatus,
  ): Promise<UpdateDeleteResDto> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    lead.status = status;
    const savedLead = await this.leadRepository.save(lead);
    return plainToInstance(UpdateDeleteResDto, { id: savedLead.id });
  }
}
