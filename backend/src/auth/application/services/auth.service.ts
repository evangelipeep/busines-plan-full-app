import {
  PasswordCryptorUseCase,
  PasswordCryptorUseCaseSymbol,
} from '@common/cryptor/domain/use-cases/password-cryptor.use-case';
import { ServiceReturnType } from '@common/types/service-return.type';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserUseCase, FindUserUseCaseSymbol } from '@users/application/use-cases/find-user.use-case';
import { User } from '@users/domain/entities/user.entity';
import { isLeft, isRight, left, right } from 'fp-ts/lib/Either';
import { AccessTokenDto } from '../dto/access-token.dto';
import { PayloadDto } from '../dto/payload.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { Unauthorized } from '../errors/unauthorized.error';
import { AuthUseCase } from '../use-cases/auth.use-case';

/**
 * Auth service.
 *
 * @description Auth use-case implementation. This service is a part of the application layer
 * of current project. Services of an application layer communicate with both domain and infrastructure
 * layers.
 */
@Injectable()
export class AuthService implements AuthUseCase {
  private readonly _logger: Logger = new Logger(AuthService.name);

  constructor(
    @Inject() private readonly _jwtService: JwtService,
    @Inject(FindUserUseCaseSymbol) private readonly _findUserService: FindUserUseCase,
    @Inject(PasswordCryptorUseCaseSymbol) private readonly _passwordCryptorService: PasswordCryptorUseCase,
  ) {}

  /**
   * Checks if user exists and compares passwords.
   *
   * @param credentials sign in DTO.
   * @returns either error or user with excluded password.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  public async validateUser(credentials: SignInDto): Promise<ServiceReturnType<Omit<User, 'password'>>> {
    try {
      const { password, ...emailOrLogin } = credentials;
      const userEither: ServiceReturnType<User> = await this._findUserService.findByEmailOrLogin(emailOrLogin);
      if (isRight(userEither)) {
        const comparePasswordEither: ServiceReturnType<boolean> = await this._passwordCryptorService.compare(
          password,
          userEither.right.password,
        );
        if (isLeft(comparePasswordEither) || !comparePasswordEither.right) {
          return left(new Unauthorized());
        }
        return right(userEither.right);
      }
      return left(new Unauthorized());
    } catch (error) {
      this._logger.error(error);
      return left(new Unauthorized());
    }
  }

  /**
   * Generates access token from provided user payload.
   *
   * @param user user entity with excluded password.
   * @returns either error or access token DTO.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  public async login(user: Omit<User, 'password'>): Promise<ServiceReturnType<AccessTokenDto>> {
    try {
      const payload: PayloadDto = { login: user.login, email: user.email, sub: user.id };
      return right(new AccessTokenDto(this._jwtService.sign(payload)));
    } catch (error) {
      this._logger.error(error);
      return left(new Unauthorized());
    }
  }
}
