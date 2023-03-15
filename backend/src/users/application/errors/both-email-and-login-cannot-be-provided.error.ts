import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class BothEmailAndLoginCannotBeProvided extends ServiceError {
  constructor() {
    super("Both 'email' and 'login' cannot be provided at the same time.", HttpStatus.BAD_REQUEST);
  }
}
