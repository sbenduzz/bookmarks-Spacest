import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IntOrUndefinedPipe implements PipeTransform {
  transform(
    value: string,
    metadata: ArgumentMetadata,
  ): number | undefined {
    if (value === undefined) {
      return undefined;
    }

    const parsedValue = parseInt(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        `Validation failed: ${metadata.data} must be an integer.`,
      );
    }

    return parsedValue;
  }
}
