import { IRepository } from '@common/repository/repository';
import { User } from '../entities/user.entity';

/**
 * User repository symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const UserRepositorySymbol: symbol = Symbol('UserRepository');

/**
 * User repository interface.
 *
 * @description {@link https://habr.com/ru/post/248505/ | Repository pattern} is a very useful
 * pattern. Repository commonly refers to a storage location, often for safety or preservation.
 * This is the interface of a user repository.
 */
export interface IUserRepository extends IRepository {
  /**
   * Creates a new user record into the database.
   *
   * @param user user entity.
   */
  create(user: User): Promise<User>;

  /**
   * Creates a find scope and returns all of the users that exist into the database.
   *
   * @returns array of user entities.
   */
  findAll(): Promise<User[]>;

  /**
   * Creates a find scope and returns a user with the provided `id` from the database.
   *
   * @param id user id.
   * @returns user entity.
   */
  findById(id: string): Promise<User>;

  /**
   * Creates a find scope and returns a user with provided `login` of `email` from the database.
   *
   * @param emailOrLogin user email or login.
   * @returns user entity.
   */
  findByEmailOrLogin(emailOrLogin: Partial<Pick<User, 'email' | 'login'>>): Promise<User>;

  /**
   * Checks if a user with current email or login already exists.
   *
   * @param emailOrLogin user email and login.
   * @returns true of false.
   */
  isPlayerWithCurrentEmailOrLoginExist(emailOrLogin: Partial<Pick<User, 'email' | 'login'>>): Promise<boolean>;

  /**
   * Updates an existing user record.
   *
   * @param user user entity.
   */
  update(user: User): Promise<void>;

  /**
   * Deletes an existing user record by the provided `id` from the database.
   *
   * @param id user id.
   */
  delete(id: string): Promise<void>;
}
