import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class UserByEmailOrLoginNotFound extends ServiceError {
  constructor(emailOrLogin: string) {
    super(`User with current 'email' or 'login' not found: ${emailOrLogin}.`, HttpStatus.NOT_FOUND);
  }
}
