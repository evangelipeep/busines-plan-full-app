import { CryptorModule } from '@common/cryptor/cryptor.module';
import {
  PasswordCryptorUseCase,
  PasswordCryptorUseCaseSymbol,
} from '@common/cryptor/domain/use-cases/password-cryptor.use-case';
import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './application/controller/users.controller';
import { CreateUserService } from './application/services/create-user.service';
import { FindUserService } from './application/services/find-user.service';
import { UpdateUserStrategy } from './application/services/strategies/interface/update-user.strategy';
import {
  UpdateUserEmailStrategy,
  UpdateUserEmailStrategySymbol,
} from './application/services/strategies/update-user-email.strategy';
import {
  UpdateUserLoginStrategy,
  UpdateUserLoginStrategySymbol,
} from './application/services/strategies/update-user-login.strategy';
import {
  UpdateUserPasswordStrategy,
  UpdateUserPasswordStrategySymbol,
} from './application/services/strategies/update-user-password.strategy';
import { UpdateUserService } from './application/services/update-user.service';
import { CreateUserUseCaseSymbol } from './application/use-cases/create-user.use-case';
import { FindUserUseCaseSymbol } from './application/use-cases/find-user.use-case';
import { UpdateUserUseCaseSymbol } from './application/use-cases/update-user.use-case';
import { IUserRepository, UserRepositorySymbol } from './domain/repository/user.repository';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserMongooseSchema, UserSchema } from './infrastructure/schemas/user.schema';

const providers: Provider[] = [
  {
    provide: UserRepositorySymbol,
    useClass: UserRepository,
  },
  {
    provide: CreateUserUseCaseSymbol,
    useFactory: (userRepository: IUserRepository, passwordCryptorService: PasswordCryptorUseCase) => {
      return new CreateUserService(userRepository, passwordCryptorService);
    },
    inject: [UserRepositorySymbol, PasswordCryptorUseCaseSymbol],
  },
  {
    provide: FindUserUseCaseSymbol,
    useFactory: (userRepository: IUserRepository) => {
      return new FindUserService(userRepository);
    },
    inject: [UserRepositorySymbol],
  },
  {
    provide: UpdateUserLoginStrategySymbol,
    useFactory: (userRepository: IUserRepository) => {
      return new UpdateUserLoginStrategy(userRepository);
    },
    inject: [UserRepositorySymbol],
  },
  {
    provide: UpdateUserEmailStrategySymbol,
    useFactory: (userRepository: IUserRepository) => {
      return new UpdateUserEmailStrategy(userRepository);
    },
    inject: [UserRepositorySymbol],
  },
  {
    provide: UpdateUserPasswordStrategySymbol,
    useFactory: (userRepository: IUserRepository, passwordCryptorService: PasswordCryptorUseCase) => {
      return new UpdateUserPasswordStrategy(userRepository, passwordCryptorService);
    },
    inject: [UserRepositorySymbol, PasswordCryptorUseCaseSymbol],
  },
  {
    provide: UpdateUserUseCaseSymbol,
    useFactory: (
      updateUserLoginStrategy: UpdateUserStrategy,
      updateUserEmailStrategy: UpdateUserStrategy,
      updateUserPasswordStrategy: UpdateUserStrategy,
    ) => {
      return new UpdateUserService(updateUserLoginStrategy, updateUserEmailStrategy, updateUserPasswordStrategy);
    },
    inject: [UpdateUserLoginStrategySymbol, UpdateUserEmailStrategySymbol, UpdateUserPasswordStrategySymbol],
  },
];

@Module({
  imports: [MongooseModule.forFeature([{ name: UserSchema.name, schema: UserMongooseSchema }]), CryptorModule],
  controllers: [UsersController],
  providers: [...providers],
  exports: [...providers],
})
export class UsersModule {}
