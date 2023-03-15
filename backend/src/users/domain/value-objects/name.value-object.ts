import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Name properties.
 *
 * @description Name properties that a name value object must implement.
 * This is a short description of the properties:
 * - `firstName` – user first name.
 * - `secondName` – user second name.
 */
export interface NameProps {
  firstName: string;
  lastName: string;
}

/**
 * Name value object class.
 *
 * @description This class describes name value object.
 */
export class Name {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName!: string;

  /**
   * Creates new name.
   *
   * @param props name properties.
   */
  private constructor(props: NameProps) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }

  /**
   * Static factory method that create new name.
   *
   * {@link https://refactoring.guru/ru/design-patterns/factory-comparison | Factory pattern explanation}
   *
   * @param props name properties.
   * @returns name value object.
   */
  public static create(props: NameProps): Name {
    return new Name(props);
  }
}
