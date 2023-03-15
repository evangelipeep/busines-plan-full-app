import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class EitherEmailOrLoginMustBeProvided extends ServiceError {
  constructor() {
    super("Either 'email' or 'password' must be provided.", HttpStatus.BAD_REQUEST);
  }
}
