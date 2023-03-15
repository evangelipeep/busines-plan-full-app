import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Find user by id DTO.
 *
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export class FindUserByIdDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  public id!: string;
}
