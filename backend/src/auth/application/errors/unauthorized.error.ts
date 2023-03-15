import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class Unauthorized extends ServiceError {
  constructor() {
    super("Unauthorized, please check that you've provided correct credentials.", HttpStatus.UNAUTHORIZED);
  }
}
