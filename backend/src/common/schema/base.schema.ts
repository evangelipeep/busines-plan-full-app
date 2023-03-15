import { Prop } from '@nestjs/mongoose';

/**
 * Base schema abstract class.
 *
 * @description This class incapsulates basic logic of a schema object.
 * Every record in the database should include a unique identifier.
 */
export abstract class BaseSchema {
  @Prop({ type: String, required: true })
  public _id!: string;
}
