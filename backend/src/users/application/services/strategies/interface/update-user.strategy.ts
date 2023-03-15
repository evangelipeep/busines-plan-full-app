import { ServiceReturnType } from '@common/types/service-return.type';
import { UpdateUserDto } from '../../../dto/update-user.dto';

/**
 * Update user strategy interface.
 *
 * @description This interface is a contract that describes how user updation executes.
 * In this interface we have the only method `update` that every implementation must implement.
 */
export interface UpdateUserStrategy {
  /**
   * Updates a user by provided id.
   *
   * @param id user id.
   * @param updateUserDto user update DTO.
   * @returns unknown.
   * @see [ServiceReturnType](./../../../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  update(id: string, updateUserDto: UpdateUserDto): Promise<ServiceReturnType<void>>;
}
