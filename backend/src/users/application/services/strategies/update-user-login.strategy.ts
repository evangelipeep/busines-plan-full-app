import { ServiceReturnType } from '@common/types/service-return.type';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CannotUpdateUserLogin } from '@users/application/errors/cannot-update-user-login.error';
import { UserByIdNotFound } from '@users/application/errors/user-by-id-not-found.error';
import { UserWithCurrentLoginAlreadyExists } from '@users/application/errors/user-with-current-login-already-exists.error';
import { User } from '@users/domain/entities/user.entity';
import { IUserRepository } from '@users/domain/repository/user.repository';
import { UserRepository } from '@users/infrastructure/repository/user.repository';
import { left, right } from 'fp-ts/lib/Either';
import { UpdateUserLoginDto } from '../../dto/update-user.dto';
import { UpdateUserStrategy } from './interface/update-user.strategy';

/**
 * Update user login strategy symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const UpdateUserLoginStrategySymbol: symbol = Symbol('UpdateUserLoginStrategy');

/**
 * Update user login strategy.
 *
 * @description This is a concrete strategy class implementation. This strategy describes
 * a logic of login updation.
 */
@Injectable()
export class UpdateUserLoginStrategy implements UpdateUserStrategy {
  /**
   * Internal service logger.
   *
   * @description Logs all of the errors in the methods of this service.
   */
  private readonly _logger: Logger = new Logger(UpdateUserLoginStrategy.name);

  /**
   * Creates new update user login strategy instance.
   *
   * @param _userRepository user repository.
   */
  constructor(@Inject(UserRepository) private readonly _userRepository: IUserRepository) {}

  /**
   * Updates user login.
   *
   * @param id user id.
   * @param updateUserDto update user login DTO.
   * @returns either error or void promise.
   * @see [ServiceReturnType](./../../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  public async update(id: string, updateUserDto: UpdateUserLoginDto): Promise<ServiceReturnType<void>> {
    try {
      const user: User = await this._userRepository.findById(id);
      if (!user) {
        return left(new UserByIdNotFound(id));
      }
      const userWithCurrentLogin: User = await this._userRepository.findByEmailOrLogin(updateUserDto);
      if (userWithCurrentLogin && user.id !== userWithCurrentLogin.id) {
        return left(new UserWithCurrentLoginAlreadyExists(updateUserDto.login));
      }
      user.update(updateUserDto);
      return right(await this._userRepository.update(user));
    } catch (error) {
      console.error(error);
      this._logger.error(error);
      return left(new CannotUpdateUserLogin());
    }
  }
}
