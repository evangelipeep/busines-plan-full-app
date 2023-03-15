import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class UserWithCurrentEmailAlreadyExists extends ServiceError {
  constructor(email: string) {
    super(`Cannot update email. User with current 'email' already exists: ${email}.`, HttpStatus.BAD_REQUEST);
  }
}
