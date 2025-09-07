import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    if (!value) {
      throw new BadRequestException('File is required');
    }

    //check file size and type
    if (value.size > 1000) {
      throw new BadRequestException('File size is too large');
    }

    if (
      value.mimetype !== 'image/jpeg' &&
      value.mimetype !== 'image/png' &&
      value.mimetype !== 'image/jpg' &&
      value.mimetype !== 'image/webp' &&
      value.mimetype !== 'image/svg' &&
      value.mimetype !== 'image/gif'
    ) {
      throw new BadRequestException('File type is not supported');
    }

    //check file extension is jpg or png or gif or jpeg or webp or svg
    if (
      value.extension !== 'jpg' &&
      value.extension !== 'png' &&
      value.extension !== 'gif' &&
      value.extension !== 'jpeg' &&
      value.extension !== 'webp' &&
      value.extension !== 'svg'
    ) {
      throw new BadRequestException('File extension is not supported');
    }

    return value;
  }
}
