import { ErrorResponse } from '@common/response/error.response';
import { SuccessResponse } from '@common/response/success.response';
import { ServiceReturnType } from '@common/types/service-return.type';
import { Body, Controller, Get, HttpException, Inject, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '@users/application/dto/create-user.dto';
import { CreateUserUseCase, CreateUserUseCaseSymbol } from '@users/application/use-cases/create-user.use-case';
import { FindUserUseCase, FindUserUseCaseSymbol } from '@users/application/use-cases/find-user.use-case';
import { User } from '@users/domain/entities/user.entity';
import { isLeft } from 'fp-ts/lib/Either';
import { AccessTokenDto } from '../dto/access-token.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthorizedRequest } from '../types/authorized-request.type';
import { AuthUseCase, AuthUseCaseSymbol } from '../use-cases/auth.use-case';

@ApiBearerAuth()
@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CreateUserUseCaseSymbol) private readonly _createUserService: CreateUserUseCase,
    @Inject(AuthUseCaseSymbol) private readonly _authService: AuthUseCase,
    @Inject(FindUserUseCaseSymbol) private readonly _findUserService: FindUserUseCase,
  ) {}

  @ApiCreatedResponse({
    type: SuccessResponse<User>,
    description: 'Returns the created user.',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: 'Internal server error response.',
  })
  @Post('sign-up')
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this._createUserService.create(createUserDto).then((usersEither: ServiceReturnType<User>) => {
      if (isLeft(usersEither)) {
        throw new HttpException(usersEither.left.message, usersEither.left.status);
      }
      return usersEither.right;
    });
  }

  @ApiOkResponse({
    type: SuccessResponse<AccessTokenDto>,
    description: 'Returns JWT access token.',
  })
  @Post('sign-in')
  public async signIn(@Body() signInDto: SignInDto): Promise<AccessTokenDto> {
    return await this._authService
      .validateUser(signInDto)
      .then(async (validateUserEither: ServiceReturnType<Omit<User, 'password'>>) => {
        if (isLeft(validateUserEither)) {
          throw new HttpException(validateUserEither.left.message, validateUserEither.left.status);
        }
        const accessTokenDtoEither = await this._authService.login(validateUserEither.right);
        if (isLeft(accessTokenDtoEither)) {
          throw new HttpException(accessTokenDtoEither.left.message, accessTokenDtoEither.left.status);
        }
        return accessTokenDtoEither.right;
      });
  }

  @ApiOkResponse({
    type: SuccessResponse<User>,
    description: 'Returns user entity.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@Request() { user }: AuthorizedRequest): Promise<any> {
    return await this._findUserService.findById(user.sub).then((userEither: ServiceReturnType<User>) => {
      if (isLeft(userEither)) {
        throw new HttpException(userEither.left.message, userEither.left.status);
      }
      return userEither.right;
    });
  }
}
