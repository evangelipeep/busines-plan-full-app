import { ServiceReturnType } from '@common/types/service-return.type';
import { User } from '@users/domain/entities/user.entity';
import { FindUserByEmailOrLoginDto } from '../dto/find-user-by-email-or-login.dto';

/**
 * Find user use-case symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const FindUserUseCaseSymbol: symbol = Symbol('FindUserUseCase');

/**
 * Find user use-case.
 *
 * @description Find user use-case interface describes a basic contract of the user search.
 * Find user service must implement this class.
 */
export interface FindUserUseCase {
  /**
   * Find all of the users in the database.
   *
   * @returns either error or array of user entities promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   */
  findAll(): Promise<ServiceReturnType<User[]>>;

  /**
   * Find a current user by id.
   *
   * @param id user id.
   * @returns either error or user entity promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   */
  findById(id: string): Promise<ServiceReturnType<User>>;

  /**
   * Find a current user by email or login.
   *
   * @param findUserByEmailOrLoginDto find user by email or login DTO.
   * @returns either error or user entity promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  findByEmailOrLogin(findUserByEmailOrLoginDto: FindUserByEmailOrLoginDto): Promise<ServiceReturnType<User>>;
}
