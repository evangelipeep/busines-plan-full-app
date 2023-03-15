import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Name } from './name.value-object';

/**
 * Profile properties.
 *
 * @description Profile properties that a profile value object must implement.
 * This is a short description of the properties:
 * - `name` – name value object.
 * - `birthday` – the date of birth of the current user this ptofile
 * is related with.
 * - `avatar` – profile avatar path.
 */
export interface ProfileProps {
  name: Name;
  birthday: Date;
  avatar?: string;
}

/**
 * Profile value object class.
 *
 * @description This class describes profile value object. Profile is a collection where
 * we store a user metadata. User metadata is not required at all but it describes an
 * additional information about the user: his name, date of birth and avatar.
 */
export class Profile {
  @ApiProperty({ type: Name })
  @Type(() => Name)
  @ValidateNested()
  public name: Name;

  @ApiProperty()
  @IsDate()
  public birthday: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public avatar?: string;

  /**
   * Creates new profile.
   *
   * @param props profile properties.
   */
  private constructor(props: ProfileProps) {
    this.name = props.name;
    this.birthday = props.birthday;
    this.avatar = props.avatar;
  }

  /**
   * Static factory method that creates new profile.
   *
   * {@link https://refactoring.guru/ru/design-patterns/factory-comparison | Factory pattern explanation}
   *
   * @param props profile properties.
   * @returns profile value object.
   */
  public static create(props: ProfileProps): Profile {
    return new Profile(props);
  }
}
