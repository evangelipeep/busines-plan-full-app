import { ServiceError } from '@common/errors/service.error';

export class UsersNotFound extends ServiceError {
  constructor() {
    super('Users not found, please try later.');
  }
}
