import { ServiceReturnType } from '@common/types/service-return.type';
import { User } from '@users/domain/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

/**
 * Create user use-case symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const CreateUserUseCaseSymbol: symbol = Symbol('CreateUserUseCase');

/**
 * Create user use-case.
 *
 * @description Create user use-case interface describes a basic contract of the user creation.
 * Create user service must implement this class.
 */
export interface CreateUserUseCase {
  /**
   * Creates new user.
   *
   * @param createUserDto create user DTO.
   * @returns either error or void promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  create(createUserDto: CreateUserDto): Promise<ServiceReturnType<User>>;
}
