import { CryptorModule } from '@common/cryptor/cryptor.module';
import {
  PasswordCryptorUseCase,
  PasswordCryptorUseCaseSymbol,
} from '@common/cryptor/domain/use-cases/password-cryptor.use-case';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FindUserUseCase, FindUserUseCaseSymbol } from '@users/application/use-cases/find-user.use-case';
import { UsersModule } from '@users/users.module';
import { Algorithm } from 'jsonwebtoken';
import { AuthController } from './application/controller/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { AuthUseCaseSymbol } from './application/use-cases/auth.use-case';

const providers: Provider[] = [
  {
    provide: AuthUseCaseSymbol,
    useFactory: (
      jwtService: JwtService,
      findUserService: FindUserUseCase,
      passwordCryptorService: PasswordCryptorUseCase,
    ) => {
      return new AuthService(jwtService, findUserService, passwordCryptorService);
    },
    inject: [JwtService, FindUserUseCaseSymbol, PasswordCryptorUseCaseSymbol],
  },
  JwtStrategy,
];

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const algorithm: Algorithm = configService.get<Algorithm>('BACKEND_APP_JWT_ALGORITHM');
        const jwtOptions: JwtModuleOptions = {
          signOptions: {
            expiresIn: configService.get<string>('BACKEND_APP_JWT_EXPIRES_IN'),
            algorithm,
          },
        };

        if (algorithm.slice(0, 2) === 'HS') {
          jwtOptions.secret = configService.get<string>('BACKEND_APP_JWT_SECRET');
        } else if (algorithm !== 'none') {
          jwtOptions.publicKey = configService.get<string>('APP_JWT_PUBLIC_KEY');
          jwtOptions.privateKey = configService.get<string>('APP_JWT_PRIVATE_KEY');
        }

        return { ...jwtOptions };
      },
      inject: [ConfigService],
    }),
    PassportModule,
    UsersModule,
    CryptorModule,
  ],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {}
