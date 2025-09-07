import {
  Body,
  Controller,
  Get,
  BadRequestException,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { FileValidationPipe } from './file-validation';

@Controller()
export class BunnyCloudServiceController {
  private readonly storageZone = 'crm-dash';
  private readonly apiKey = '38adf11e-738d-4e10-99e92f22ce14-4637-4534';
  private readonly folder = 'images';
  private readonly pullZone = 'https://crm-dash.b-cdn.net/';
  constructor(private readonly httpService: HttpService) {}

  @Post('upload-single')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    //upload file to bunny cloud rxjs from axios
    const response = this.httpService.put(
      `https://storage.bunnycdn.com/${this.storageZone}/${this.folder}/${file.originalname}`,
      file.buffer,
      {
        headers: {
          AccessKey: this.apiKey,
          'Content-Type': 'application/octet-stream',
        },
      },
    );
    const data = await lastValueFrom(response);

    if (data.data.HttpCode !== 201) {
      throw new BadRequestException('Failed to upload file');
    }

    return {
      type: file.mimetype,
      size: file.size,
      name: file.originalname,
      extension: file.originalname.split('.').pop(),
      path: `${this.pullZone}${this.folder}/${file.originalname}`,
    };
  }
}
