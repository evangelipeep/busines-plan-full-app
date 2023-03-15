import {
  PasswordCryptorUseCase,
  PasswordCryptorUseCaseSymbol,
} from '@common/cryptor/domain/use-cases/password-cryptor.use-case';
import { ServiceReturnType } from '@common/types/service-return.type';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '@users/domain/entities/user.entity';
import { IUserRepository, UserRepositorySymbol } from '@users/domain/repository/user.repository';
import { isLeft, left, right } from 'fp-ts/lib/Either';
import { CreateUserDto } from '../dto/create-user.dto';
import { CannotCreateUser } from '../errors/cannot-create-user.error';
import { UserWithCurrentEmailOrLoginAlreadyExists } from '../errors/user-with-current-email-or-login-already-exists.error';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';

/**
 * Create user service.
 *
 * @description Create user use-case implementation. This service is a part of the application layer
 * of current project. Services of an application layer communicate with both domain and infrastructure
 * layers.
 */
@Injectable()
export class CreateUserService implements CreateUserUseCase {
  /**
   * Internal service logger.
   *
   * @description Logs all of the errors in the methods of this service.
   */
  private readonly _logger: Logger = new Logger(CreateUserService.name);

  /**
   * Creates new create user service instance.
   *
   * @param _userRepository user repository.
   * @param _passwordCryptorService password cryptor service.
   */
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _userRepository: IUserRepository,
    @Inject(PasswordCryptorUseCaseSymbol)
    private readonly _passwordCryptorService: PasswordCryptorUseCase,
  ) {}

  /**
   * Creates new user.
   *
   * @param createUserDto create user DTO.
   * @returns either error or user entity promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  public async create(createUserDto: CreateUserDto): Promise<ServiceReturnType<User>> {
    try {
      const isExistEither: boolean = await this._userRepository.isPlayerWithCurrentEmailOrLoginExist({
        login: createUserDto.login,
        email: createUserDto.email,
      });
      if (isExistEither) {
        return left(new UserWithCurrentEmailOrLoginAlreadyExists());
      }
      const passwordHash: ServiceReturnType<string> = await this._passwordCryptorService.hash(createUserDto.password);
      if (isLeft(passwordHash)) {
        return left(passwordHash.left);
      }
      const user: User = User.create({
        login: createUserDto.login,
        email: createUserDto.email,
        password: passwordHash.right,
      });
      return right(await this._userRepository.create(user));
    } catch (error) {
      this._logger.error(error);
      return left(new CannotCreateUser());
    }
  }
}
