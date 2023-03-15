import { User } from '@users/domain/entities/user.entity';
import { UserSchema } from '../schemas/user.schema';

/**
 * User mapper class.
 *
 * @description User mapper class performs transfer of data between domain and infrastructure
 * layers. This class casts one type of object to another (domain to schema).
 */
export class UserMapper {
  /**
   * Static method that casts an infrastructure schema to the domain entity.
   *
   * @param userSchema user schema.
   * @returns user entity.
   */
  public static toDomain<T extends UserSchema>(userSchema: T): User {
    return User.create(
      {
        login: userSchema.login,
        email: userSchema.email,
        password: userSchema.password,
        createdAt: userSchema.createdAt,
        updatedAt: userSchema.updatedAt,
      },
      userSchema._id,
    );
  }

  /**
   * Static method that casts an domain entity to the infrastructure schema.
   *
   * @param user user entity.
   * @returns user schema.
   */
  public static toSchema(user: User): UserSchema {
    return {
      _id: user.id,
      login: user.login,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
