import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto, UpdateLeadDto, LeadReqDto, LeadResDto } from './dto';
import { Lead } from './entities/lead.entity';
import { PaginationResponse } from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { LeadStatus } from './enums/lead-status';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createLeadDto: CreateLeadDto,
  ): Promise<Lead> {
    return await this.leadService.create(createLeadDto);
  }

  @Get()
  async findAll(
    @Query() leadReqDto: LeadReqDto,
  ): Promise<PaginationResponse<LeadResDto>> {
    return await this.leadService.findAll(leadReqDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<LeadResDto> {
    return await this.leadService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateLeadDto: UpdateLeadDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.leadService.update(id, updateLeadDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: LeadStatus,
  ): Promise<UpdateDeleteResDto> {
    return await this.leadService.updateStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.leadService.remove(id);
  }
}
