import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class PayloadDto {
  @IsUUID('4')
  @IsNotEmpty()
  public sub!: string;

  @IsString()
  @IsNotEmpty()
  public login!: string;

  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public iat?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public exp?: number;
}
