import { Entity, TimestampEmtity } from '@common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Profile } from '../value-objects/profile.value-object';

/**
 * User properties.
 *
 * @description User properties that a user entity class must implement. This is
 * a short description of the properties:
 * - `login` – user login, unique field;
 * - `email` – user email address;
 * - `password` – user password hash.
 */
export interface UserProps extends TimestampEmtity {
  login: string;
  email: string;
  password: string;
}

/**
 * User entity class.
 *
 * @description This class describes user entity.
 */
export class User extends Entity<UserProps> implements UserProps {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public login!: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  public password!: string;

  @ApiProperty({ type: Profile })
  @Type(() => Profile)
  @ValidateNested()
  @IsOptional()
  public profile?: Profile;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public createdAt?: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public updatedAt?: Date;

  /**
   * Creates new user.
   *
   * @param props user properties.
   * @param id user id.
   */
  private constructor(props: UserProps, id?: string) {
    super(id);
    this.login = props.login;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props?.createdAt ?? new Date();
    this.updatedAt = props?.updatedAt ?? new Date();
  }

  /**
   * Static factory method that creates new user.
   *
   * {@link https://refactoring.guru/ru/design-patterns/factory-comparison | Factory pattern explanation}
   *
   * @param props user properties.
   * @param id user id.
   * @returns user.
   */
  public static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  /**
   * Updates user by provided properties.
   *
   * @description Partial type is a type where all of the properties are optional. This
   * method updates existing user entity.
   * @param props
   */
  public update(props: Partial<UserProps>): void {
    this.login = props?.login ?? this.login;
    this.email = props?.email ?? this.email;
    this.password = props?.password ?? this.password;
    this.updatedAt = props?.updatedAt ?? new Date();
  }
}
