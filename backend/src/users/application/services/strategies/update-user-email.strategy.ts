import { ServiceReturnType } from '@common/types/service-return.type';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateUserEmailDto } from '@users/application/dto/update-user.dto';
import { CannotUpdateUserEmail } from '@users/application/errors/cannot-update-user-email.error';
import { UserByIdNotFound } from '@users/application/errors/user-by-id-not-found.error';
import { UserWithCurrentEmailAlreadyExists } from '@users/application/errors/user-with-current-email-exists.error';
import { User } from '@users/domain/entities/user.entity';
import { IUserRepository, UserRepositorySymbol } from '@users/domain/repository/user.repository';
import { left, right } from 'fp-ts/lib/Either';
import { UpdateUserStrategy } from './interface/update-user.strategy';

/**
 * Update user email strategy symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const UpdateUserEmailStrategySymbol: symbol = Symbol('UpdateUserEmailStrategy');

/**
 * Update user email strategy.
 *
 * @description This is a concrete strategy class implementation. This strategy describes
 * a logic of email updation.
 */
@Injectable()
export class UpdateUserEmailStrategy implements UpdateUserStrategy {
  /**
   * Internal service logger.
   *
   * @description Logs all of the errors in the methods of this service.
   */
  private readonly _logger: Logger = new Logger(UpdateUserEmailStrategy.name);

  /**
   * Creates new update user email strategy instance.
   *
   * @param _userRepository user repository.
   */
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _userRepository: IUserRepository,
  ) {}

  /**
   * Updates user email.
   *
   * @param id user id.
   * @param updateUserDto update user email DTO.
   * @returns either error or void promise.
   * @see [ServiceReturnType](./../../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  public async update(id: string, updateUserDto: UpdateUserEmailDto): Promise<ServiceReturnType<void>> {
    try {
      const user: User = await this._userRepository.findById(id);
      if (!user) {
        return left(new UserByIdNotFound(id));
      }
      const userWithCurrentEmail: User = await this._userRepository.findByEmailOrLogin({
        email: updateUserDto.newEmail,
      });
      if (userWithCurrentEmail && user.id !== userWithCurrentEmail.id) {
        return left(new UserWithCurrentEmailAlreadyExists(updateUserDto.newEmail));
      }
      return right(await this._userRepository.update(user));
    } catch (error) {
      this._logger.error(error);
      return left(new CannotUpdateUserEmail());
    }
  }
}
