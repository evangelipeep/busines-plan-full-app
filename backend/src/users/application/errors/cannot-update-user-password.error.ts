import { ServiceError } from '@common/errors/service.error';

export class CannotUpdateUserPassword extends ServiceError {
  constructor() {
    super('Cannot update user password, please try later.');
  }
}
