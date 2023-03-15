import { ServiceError } from '@common/errors/service.error';

export class CannotUpdateUserEmail extends ServiceError {
  constructor() {
    super('Cannot update user email, please try later.');
  }
}
