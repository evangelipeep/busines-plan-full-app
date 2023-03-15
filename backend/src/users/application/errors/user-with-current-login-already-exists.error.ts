import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class UserWithCurrentLoginAlreadyExists extends ServiceError {
  constructor(login: string) {
    super(`Cannot update user login. User with current 'login' already exists: ${login}.`, HttpStatus.BAD_REQUEST);
  }
}
