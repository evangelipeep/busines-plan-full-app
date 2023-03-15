import { UpdateDto } from '@common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Update user login DTO.
 *
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export class UpdateUserLoginDto extends UpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public login!: string;
}

/**
 * Update user email DTO.
 *
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export class UpdateUserEmailDto extends UpdateDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public oldEmail!: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public newEmail!: string;
}

/**
 * Update user password DTO.
 *
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export class UpdateUserPasswordDto extends UpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public oldPassword!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public newPassword: string;
}

/**
 * Update user DTO type.
 *
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export type UpdateUserDto = UpdateUserEmailDto | UpdateUserLoginDto | UpdateUserPasswordDto;
