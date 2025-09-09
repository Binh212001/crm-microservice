import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import {
  CreateOpportunityDto,
  OpportunityReqDto,
  OpportunityResDto,
  UpdateOpportunityDto,
} from './dto';
import { PaginationResponse } from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { OpportunityStatus } from './enums/opportunity-status';
import { Opportunity } from './entities/opportunity.entity';

@Controller('opportunities')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) dto: CreateOpportunityDto,
  ): Promise<Opportunity> {
    return await this.opportunityService.create(dto);
  }

  @Get()
  async findAll(
    @Query() req: OpportunityReqDto,
  ): Promise<PaginationResponse<OpportunityResDto>> {
    return await this.opportunityService.findAll(req);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OpportunityResDto> {
    return await this.opportunityService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateOpportunityDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.opportunityService.update(id, dto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: OpportunityStatus,
  ): Promise<UpdateDeleteResDto> {
    return await this.opportunityService.updateStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.opportunityService.remove(id);
  }
}
