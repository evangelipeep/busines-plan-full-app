import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { v4 } from 'uuid';

/**
 * Abstract entity class.
 *
 * @description Every entity class must extend this abstract class. This
 * abstract class incapsulates basic entity functionality.
 */
export abstract class Entity<T> {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  protected readonly _id!: string;

  /**
   * Protected constructor of an abstract entity class.
   *
   * @param id entity id.
   */
  protected constructor(id: string) {
    this._id = id ?? v4();
  }

  /**
   * Abstract update method that every entity must initialize.
   *
   * @param props entity properties.
   */
  public abstract update(props: T): void;

  /**
   * Id getter method. Getters and setters are useful if you need to get an access to a
   * private and protected properties of the class.
   *
   * @description As
   * @returns entity id.
   */
  public get id(): string {
    return this._id;
  }
}

/**
 * Basic timestamp entity interface.
 *
 * @description Timestamp entity interface consists of:
 * - `createdAt` – field that describes a date of instance creation;
 * - `updatedAt` – field that describes a date of instance updation.
 */
export interface TimestampEmtity {
  /**
   * Date of the record creation.
   */
  createdAt?: Date;
  /**
   * Date of the record updation.
   */
  updatedAt?: Date;
}
