import { User } from '@users/domain/entities/user.entity';

/**
 * Prepare user find scope property type.
 *
 * @description This is a type of the `_prepareFindScope` private method property.
 */
export type PrepareUserFindScopePropertyType = Partial<Omit<User, 'profile' | 'password'>>;

/**
 * Prepare user find scope return type.
 *
 * @description This is a type of the `_prepareFindScope` private method return.
 */
export type PrepareUserFindScopeReturnType =
  | Record<keyof Omit<PrepareUserFindScopePropertyType, 'id'>, string>[]
  | { _id?: string }[];
