import { ServiceError } from '@common/errors/service.error';

export class CannotCreateUser extends ServiceError {
  constructor() {
    super('Cannot create user, please try later.');
  }
}
