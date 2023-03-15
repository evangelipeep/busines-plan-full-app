import { ServiceError } from '@common/errors/service.error';
import { Either } from 'fp-ts/lib/Either';

/**
 * Service return type.
 *
 * @description In functional programming (in golang, for example) there is a useful
 * concept of value returning. We return all of the exceptions as the left result and
 * all of the successful results as the right result. This class incapsulates this logic
 * into useful and simple type.
 */
export type ServiceReturnType<T> = Either<ServiceError, T>;
