import { IsDate, IsNotEmpty } from 'class-validator';

/**
 * Update DTO abstract class.
 *
 * @description This abstract class describes basic update DTO object with the properties
 * that other update DTOs must implement.
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export abstract class UpdateDto {
  @IsDate()
  @IsNotEmpty()
  public readonly updatedAt: Date = new Date();
}

/**
 * Create DTO abstract class.
 *
 * @description This abstract class describes basic create DTO object with the properties
 * that other create DTOs must implement.
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export abstract class CreateDto extends UpdateDto {
  @IsDate()
  @IsNotEmpty()
  public readonly createdAt: Date = new Date();
}
