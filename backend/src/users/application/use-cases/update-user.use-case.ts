import { ServiceReturnType } from '@common/types/service-return.type';
import { UpdateUserDto } from '../dto/update-user.dto';

/**
 * Update user use-case symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const UpdateUserUseCaseSymbol: symbol = Symbol('UpdateUserUseCase');

/**
 * Update user use-case.
 *
 * @description Update user use-case interface describes a basic contract of the user updation.
 * Update user service must implement this class.
 */
export interface UpdateUserUseCase {
  /**
   * Updates user with provided id.
   *
   * @param id user id.
   * @param updateUserDto update user DTO.
   * @returns either error or void promise.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  update(id: string, updateUserDto: UpdateUserDto): Promise<ServiceReturnType<void>>;
}
