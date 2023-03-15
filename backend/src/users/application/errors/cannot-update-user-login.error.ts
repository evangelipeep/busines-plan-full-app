import { ServiceError } from '@common/errors/service.error';

export class CannotUpdateUserLogin extends ServiceError {
  constructor() {
    super('Cannot update user login, please try later.');
  }
}
