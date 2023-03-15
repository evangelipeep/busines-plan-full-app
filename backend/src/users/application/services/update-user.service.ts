import { ServiceReturnType } from '@common/types/service-return.type';
import { Inject, Logger } from '@nestjs/common';
import { UpdateUserDto, UpdateUserEmailDto, UpdateUserLoginDto } from '../dto/update-user.dto';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';
import { UpdateUserStrategy } from './strategies/interface/update-user.strategy';
import { UpdateUserEmailStrategySymbol } from './strategies/update-user-email.strategy';
import { UpdateUserLoginStrategySymbol } from './strategies/update-user-login.strategy';
import { UpdateUserPasswordStrategySymbol } from './strategies/update-user-password.strategy';

export class UpdateUserService implements UpdateUserUseCase {
  private readonly _logger: Logger = new Logger(UpdateUserService.name);

  constructor(
    @Inject(UpdateUserLoginStrategySymbol) private readonly _updateUserLoginStrategy: UpdateUserStrategy,
    @Inject(UpdateUserEmailStrategySymbol) private readonly _updateUserEmailStrategy: UpdateUserStrategy,
    @Inject(UpdateUserPasswordStrategySymbol) private readonly _updateUserPasswordStrategy: UpdateUserStrategy,
  ) {}

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<ServiceReturnType<void>> {
    try {
      if (updateUserDto instanceof UpdateUserLoginDto) {
        return await this._updateUserLoginStrategy.update(id, updateUserDto);
      } else if (updateUserDto instanceof UpdateUserEmailDto) {
        return await this._updateUserEmailStrategy.update(id, updateUserDto);
      }
      return await this._updateUserPasswordStrategy.update(id, updateUserDto);
    } catch (error) {
      this._logger.error(error);
    }
    throw new Error('Method not implemented.');
  }
}
