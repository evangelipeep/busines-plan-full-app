import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class UserWithCurrentEmailOrLoginAlreadyExists extends ServiceError {
  constructor() {
    super("Cannot create user. User with current 'email' or 'login' already exists.", HttpStatus.BAD_REQUEST);
  }
}
