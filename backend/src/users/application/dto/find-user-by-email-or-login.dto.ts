import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * Find user by email or login DTO.
 *
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export class FindUserByEmailOrLoginDto {
  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  public email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public login?: string;
}
