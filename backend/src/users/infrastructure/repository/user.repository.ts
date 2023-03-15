import { InjectModel } from '@nestjs/mongoose';
import { User } from '@users/domain/entities/user.entity';
import { IUserRepository } from '@users/domain/repository/user.repository';
import { omit } from 'lodash';
import { Model } from 'mongoose';
import { UserMapper } from '../mappers/user.mapper';
import { UserDocument, UserSchema } from '../schemas/user.schema';
import {
  PrepareUserFindScopePropertyType,
  PrepareUserFindScopeReturnType,
} from '../types/prepare-user-find-scope.type';

/**
 * UserRepository implementation.
 *
 * @description This class implements user repository interface. You can create mulitple
 * implementations of an user repository interface with different logic (database that it
 * uses, for example).
 */
export class UserRepository implements IUserRepository {
  /**
   * Creates new user repository instance.
   *
   * @param _userModel user mongoose model.
   */
  constructor(
    @InjectModel(UserSchema.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  /**
   * Private method that prepares user properties to a find scope.
   *
   * @param userFindOptions user properties except of `password` and `profile`.
   * @returns array of user properties except of `password` and `profile`.
   */
  private _prepareFindScope(userFindOptions: PrepareUserFindScopePropertyType): PrepareUserFindScopeReturnType {
    return Object.entries(userFindOptions).map(([key, value]: [string, string]) =>
      key === 'id'
        ? { _id: value }
        : {
            [key]: value,
          },
    );
  }

  /**
   * Creates new user record.
   *
   * @param user user entity.
   */
  public async create(user: User): Promise<User> {
    return UserMapper.toDomain(await this._userModel.create(user));
  }

  /**
   * Creates new find scope and returns all of the users that exist into database.
   *
   * @returns array of user entities.
   */
  public async findAll(): Promise<User[]> {
    const users: UserSchema[] = await this._userModel.find().lean().exec();
    return users.map<User>((user: UserSchema) => UserMapper.toDomain(user));
  }

  /**
   * Creates a find scope and returns a user with the provided `id` from the database.
   *
   * @param id user id.
   * @returns user entity.
   */
  public async findById(id: string): Promise<User> {
    const record: UserDocument = await this._userModel.findById(id);
    if (!record) {
      throw new Error(`User with current 'id' not found: ${id}`);
    }
    return UserMapper.toDomain(record);
  }

  /**
   * Creates a find scope and returns a user with the provided `email` or `login` from the database.
   *
   * @param emailOrLogin user email or login.
   * @returns user entity.
   */
  public async findByEmailOrLogin(emailOrLogin: Partial<Pick<User, 'email' | 'login'>>): Promise<User> {
    const record: UserDocument = await this._userModel.findOne({
      $or: [...this._prepareFindScope(emailOrLogin)],
    });

    return record ? UserMapper.toDomain(record) : null;
  }

  /**
   * Checks if a user with current email or login already exists.
   *
   * @param emailOrLogin user email and login.
   * @returns true of false.
   */
  public async isPlayerWithCurrentEmailOrLoginExist(
    emailOrLogin: Partial<Pick<User, 'email' | 'login'>>,
  ): Promise<boolean> {
    return Boolean(
      await this._userModel.count({
        $or: [...this._prepareFindScope(emailOrLogin)],
      }),
    );
  }

  /**
   * Updates an existing user record.
   *
   * @param user user entity.
   */
  public async update(user: Omit<User, 'email' | 'password'>): Promise<void> {
    await this._userModel.updateOne({ _id: user.id }, { ...omit(user, ...(['_id', 'id'] as const)) });
  }

  /**
   * Deletes an existing user record by the provided `id` from the database.
   *
   * @param id user id.
   */
  public async delete(id: string): Promise<void> {
    await this._userModel.deleteOne({ _id: id });
  }
}
