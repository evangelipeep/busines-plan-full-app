import { ServiceReturnType } from '@common/types/service-return.type';
import { User } from '@users/domain/entities/user.entity';
import { AccessTokenDto } from '../dto/access-token.dto';
import { SignInDto } from '../dto/sign-in.dto';

/**
 * Auth use-case symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const AuthUseCaseSymbol: symbol = Symbol('AuthUseCase');

/**
 * Auth use-case.
 *
 * @description Auth interface describes a basic contract of the authentication.
 * Auth service must implement this class.
 */
export interface AuthUseCase {
  /**
   * Checks if user exists and compares passwords.
   *
   * @param credentials sign in DTO.
   * @returns either error or user with excluded password.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  validateUser(credentials: SignInDto): Promise<ServiceReturnType<Omit<User, 'password'>>>;

  /**
   * Authenticates user and generates access token from provided user payload.
   *
   * @param user user entity with excluded password.
   * @returns either error or access token DTO.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  login(user: Omit<User, 'password'>): Promise<ServiceReturnType<AccessTokenDto>>;
}
