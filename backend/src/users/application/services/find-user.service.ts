import { ServiceReturnType } from '@common/types/service-return.type';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '@users/domain/entities/user.entity';
import { IUserRepository, UserRepositorySymbol } from '@users/domain/repository/user.repository';
import { left, right } from 'fp-ts/lib/Either';
import { FindUserByEmailOrLoginDto } from '../dto/find-user-by-email-or-login.dto';
import { BothEmailAndLoginCannotBeProvided } from '../errors/both-email-and-login-cannot-be-provided.error';
import { EitherEmailOrLoginMustBeProvided } from '../errors/either-email-or-login-must-be-provided.error';
import { UserByEmailOrLoginNotFound } from '../errors/user-by-email-or-login-not-found.error';
import { UserByIdNotFound } from '../errors/user-by-id-not-found.error';
import { UsersNotFound } from '../errors/users-not-found.error';
import { FindUserUseCase } from '../use-cases/find-user.use-case';

/**
 * Find user service.
 *
 * @description Find user use-case implementation. This service is a part of the application layer
 * of current project. Services of an application layer communicate with both domain and infrastructure
 * layers.
 */
@Injectable()
export class FindUserService implements FindUserUseCase {
  /**
   * Internal service logger.
   *
   * @description Logs all of the errors in the methods of this service.
   */
  private readonly _logger: Logger = new Logger(FindUserService.name);

  /**
   * Creates new find user service instance.
   *
   * @param _userRepository user repository.
   */
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _userRepository: IUserRepository,
  ) {}

  /**
   * Find all of the users in the database.
   *
   * @returns either error or array of user entities promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   */
  public async findAll(): Promise<ServiceReturnType<User[]>> {
    try {
      return right(await this._userRepository.findAll());
    } catch (error) {
      this._logger.error(error);
      return left(new UsersNotFound());
    }
  }

  /**
   * Find a current user by id.
   *
   * @param id user id.
   * @returns either error or user entity promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   */
  public async findById(id: string): Promise<ServiceReturnType<User>> {
    try {
      return right(await this._userRepository.findById(id));
    } catch (error) {
      this._logger.error(error);
      return left(new UserByIdNotFound(id));
    }
  }

  /**
   * Find a current user by email or login.
   *
   * @param findUserByEmailOrLoginDto find user by email or login DTO.
   * @returns either error or user entity promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  public async findByEmailOrLogin(
    findUserByEmailOrLoginDto: FindUserByEmailOrLoginDto,
  ): Promise<ServiceReturnType<User>> {
    try {
      if (findUserByEmailOrLoginDto.email && findUserByEmailOrLoginDto.login) {
        return left(new BothEmailAndLoginCannotBeProvided());
      }
      if (!findUserByEmailOrLoginDto.email && !findUserByEmailOrLoginDto.login) {
        return left(new EitherEmailOrLoginMustBeProvided());
      }
      const user: User = await this._userRepository.findByEmailOrLogin(findUserByEmailOrLoginDto);
      if (!user) {
        return left(new UserByEmailOrLoginNotFound(findUserByEmailOrLoginDto.email || findUserByEmailOrLoginDto.login));
      }
      return right(user);
    } catch (error) {
      this._logger.error(error);
      return left(new UserByEmailOrLoginNotFound(findUserByEmailOrLoginDto.email || findUserByEmailOrLoginDto.login));
    }
  }
}
