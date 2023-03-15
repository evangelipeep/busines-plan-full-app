import { CreateDto } from '@common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Create user DTO.
 *
 * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
 */
export class CreateUserDto extends CreateDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public login!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password!: string;
}
