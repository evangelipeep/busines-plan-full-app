import { BaseSchema } from '@common/schema/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserProps } from '@users/domain/entities/user.entity';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

/**
 * User schema class.
 *
 * @description User schema class represents an infrastructure entity class.
 * It incapsulates presentation of user document with all required fields.
 */
@Schema({ collection: 'users', timestamps: true })
export class UserSchema extends BaseSchema implements UserProps {
  @Prop({ type: String, required: true, unique: true })
  public login!: string;

  @Prop({ type: String, required: true, unique: true })
  public email!: string;

  @Prop({ type: String, required: true })
  public password!: string;

  @Prop({ type: Date, required: false })
  public createdAt?: Date;

  @Prop({ type: Date, required: false })
  public updatedAt?: Date;
}

/**
 * Hydrated user document type.
 *
 * @description Hydrated document type is an object with internal mongoose methods.
 */
export type UserDocument = HydratedDocument<UserSchema>;

/**
 * Mongoose user schema.
 */
export const UserMongooseSchema: MongooseSchema = SchemaFactory.createForClass(UserSchema);
