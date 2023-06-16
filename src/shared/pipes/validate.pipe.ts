import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      // console.log(e);
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
      // if (e instanceof BadRequestException) {
      //   throw new UnprocessableEntityException(this.handleError(e.message));
      // }
    }
  }

  private handleError(errors) {
    // console.log("************************", errors);

    return errors;
  }
}
