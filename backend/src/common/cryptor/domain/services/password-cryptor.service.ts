import { ServiceReturnType } from '@common/types/service-return.type';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  compare as bcryptCompare,
  compareSync as bcryptCompareSync,
  hash as bcryptHash,
  hashSync as bcryptHashSync,
} from 'bcrypt';
import { left, right } from 'fp-ts/lib/Either';
import { CannotHashPassword } from '../errors/cannot-hash-password.error';
import { PasswordDoNotMatch } from '../errors/password-do-not-match.error';
import { PasswordCryptorUseCase } from '../use-cases/password-cryptor.use-case';

/**
 * Password cryptor service.
 *
 * @description Password cryptor implementation. This service uses a {@link https://ru.wikipedia.org/wiki/Bcrypt | bcrypt} hashing algorithm.
 */
@Injectable()
export class PasswordCryptorService implements PasswordCryptorUseCase {
  /**
   * Internal service logger.
   *
   * @description Logs all of the errors in the methods of this service.
   */
  private readonly _logger: Logger = new Logger(PasswordCryptorService.name);
  private readonly _saltRounds!: number;

  /**
   * Creates new password cryptor service instance.
   *
   * @param configService config service.
   */
  constructor(@Inject() private readonly configService: ConfigService) {
    this._saltRounds = Number(configService.get<number>('APP_BCRYPT_SALT_ROUNDS'));
  }

  /**
   * Hashes plain password data asynchronously.
   *
   * @param plainPassword plain password string.
   * @returns either error or string promise.
   * @see [ServiceReturnType](./../../../types/service-return.type.ts)
   */
  public async hash(plainPassword: string): Promise<ServiceReturnType<string>> {
    try {
      const hash: string = await bcryptHash(plainPassword, this._saltRounds);
      return right(hash);
    } catch (error) {
      this._logger.error(error);
      return left(new CannotHashPassword());
    }
  }

  /**
   * Hashes plain password data synchronously.
   *
   * @param plainPassword plain password string.
   * @returns either error or string.
   * @see [ServiceReturnType](./../../../types/service-return.type.ts)
   */
  public hashSync(plainPassword: string): ServiceReturnType<string> {
    try {
      const hash: string = bcryptHashSync(plainPassword, this._saltRounds);
      return right(hash);
    } catch (error) {
      this._logger.error(error);
      return left(new CannotHashPassword());
    }
  }

  /**
   * Compares plain password data with password hash asynchronously.
   *
   * @param plainPassword plain password string.
   * @param passwordHash password hash string.
   * @returns either error or boolean promise.
   * @see [ServiceReturnType](./../../../types/service-return.type.ts)
   */
  public async compare(plainPassword: string, passwordHash: string): Promise<ServiceReturnType<boolean>> {
    try {
      const isPassword: boolean = await bcryptCompare(plainPassword, passwordHash);
      return right(isPassword);
    } catch (error) {
      this._logger.error(error);
      return left(new PasswordDoNotMatch());
    }
  }

  /**
   * Compares plain password data with password hash synchronously.
   *
   * @param plainPassword plain password string.
   * @param passwordHash password hash string.
   * @returns either error or boolean.
   * @see [ServiceReturnType](./../../../types/service-return.type.ts)
   */
  public compareSync(plainPassword: string, passwordHash: string): ServiceReturnType<boolean> {
    try {
      const isPassword: boolean = bcryptCompareSync(plainPassword, passwordHash);
      return right(isPassword);
    } catch (error) {
      this._logger.error(error);
      return left(new PasswordDoNotMatch());
    }
  }
}
