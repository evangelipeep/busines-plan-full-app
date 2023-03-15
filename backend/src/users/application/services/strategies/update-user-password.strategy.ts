import { PasswordDoNotMatch } from '@common/cryptor/domain/errors/password-do-not-match.error';
import {
  PasswordCryptorUseCase,
  PasswordCryptorUseCaseSymbol,
} from '@common/cryptor/domain/use-cases/password-cryptor.use-case';
import { ServiceReturnType } from '@common/types/service-return.type';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateUserPasswordDto } from '@users/application/dto/update-user.dto';
import { CannotUpdateUserPassword } from '@users/application/errors/cannot-update-user-password.error';
import { UserByIdNotFound } from '@users/application/errors/user-by-id-not-found.error';
import { User } from '@users/domain/entities/user.entity';
import { IUserRepository, UserRepositorySymbol } from '@users/domain/repository/user.repository';
import { isLeft, left, right } from 'fp-ts/lib/Either';
import { UpdateUserStrategy } from './interface/update-user.strategy';

/**
 * Update user password strategy symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const UpdateUserPasswordStrategySymbol: symbol = Symbol('UpdateUserPasswordStrategy');

/**
 * Update user password strategy.
 *
 * @description This is a concrete strategy class implementation. This strategy describes
 * a logic of password updation.
 */
@Injectable()
export class UpdateUserPasswordStrategy implements UpdateUserStrategy {
  /**
   * Internal service logger.
   *
   * @description Logs all of the errors in the methods of this service.
   */
  private readonly _logger: Logger = new Logger(UpdateUserPasswordStrategy.name);

  /**
   * Creates new update user password strategy instance.
   *
   * @param _userRepository user repository.
   * @param _passwordCryptorService password cryptor service.
   */
  constructor(
    @Inject(UserRepositorySymbol) private readonly _userRepository: IUserRepository,
    @Inject(PasswordCryptorUseCaseSymbol) private readonly _passwordCryptorService: PasswordCryptorUseCase,
  ) {}

  /**
   * Updates user password.
   *
   * @param id user id.
   * @param updateUserDto update user password DTO.
   * @returns either error or void promise.
   * @see [ServiceReturnType](./../../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  public async update(id: string, updateUserDto: UpdateUserPasswordDto): Promise<ServiceReturnType<void>> {
    try {
      const user: User = await this._userRepository.findById(id);
      if (!user) {
        return left(new UserByIdNotFound(id));
      }
      const comparedPassword: ServiceReturnType<boolean> = await this._passwordCryptorService.compare(
        updateUserDto.oldPassword,
        user.password,
      );
      if (isLeft(comparedPassword)) {
        return left(comparedPassword.left);
      }
      if (!comparedPassword.right) {
        return left(new PasswordDoNotMatch());
      }
      user.update({
        password: updateUserDto.newPassword,
      });
      return right(await this._userRepository.update(user));
    } catch (error) {
      this._logger.error(error);
      return left(new CannotUpdateUserPassword());
    }
  }
}
