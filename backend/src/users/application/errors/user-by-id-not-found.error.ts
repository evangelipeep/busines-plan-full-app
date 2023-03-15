import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class UserByIdNotFound extends ServiceError {
  constructor(id: string) {
    super(`User with current 'id' not found: ${id}.`, HttpStatus.BAD_REQUEST);
  }
}
