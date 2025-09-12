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

    return value;
  }
}
