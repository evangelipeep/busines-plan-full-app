import { ErrorResponse } from '@common/response/error.response';
import { SuccessResponse } from '@common/response/success.response';
import { ServiceReturnType } from '@common/types/service-return.type';
import { Body, Controller, Get, HttpException, Inject, Param, Put, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@users/domain/entities/user.entity';
import { isLeft } from 'fp-ts/lib/Either';
import { JwtAuthGuard } from 'src/auth/application/guards/jwt-auth.guard';
import { AuthorizedRequest } from 'src/auth/application/types/authorized-request.type';
import { FindUserByIdDto } from '../dto/find-user-by-id.dto';
import { UpdateUserEmailDto, UpdateUserLoginDto, UpdateUserPasswordDto } from '../dto/update-user.dto';
import { CreateUserUseCase, CreateUserUseCaseSymbol } from '../use-cases/create-user.use-case';
import { FindUserUseCase, FindUserUseCaseSymbol } from '../use-cases/find-user.use-case';
import { UpdateUserUseCase, UpdateUserUseCaseSymbol } from '../use-cases/update-user.use-case';

@ApiBearerAuth()
@ApiTags('Users Controller')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(FindUserUseCaseSymbol) private readonly _findUserService: FindUserUseCase,
    @Inject(CreateUserUseCaseSymbol) private readonly _createUserService: CreateUserUseCase,
    @Inject(UpdateUserUseCaseSymbol) private readonly _updateUserService: UpdateUserUseCase,
  ) {}

  @ApiOkResponse({
    type: SuccessResponse<User[]>,
    description: 'Returns all of the users.',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: 'Internal server error response.',
  })
  @Get()
  public async findAll(): Promise<User[]> {
    return await this._findUserService.findAll().then((usersEither: ServiceReturnType<User[]>) => {
      if (isLeft(usersEither)) {
        throw new HttpException(usersEither.left.message, usersEither.left.status);
      }
      return usersEither.right;
    });
  }

  @ApiOkResponse({
    type: SuccessResponse<User>,
    description: 'Returns a user by the provided id.',
  })
  @ApiNotFoundResponse({
    type: ErrorResponse,
    description: 'User not found response.',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: 'Internal server error response.',
  })
  @Get(':id')
  public async findById(@Param() { id }: FindUserByIdDto): Promise<User> {
    return await this._findUserService.findById(id).then((usersEither: ServiceReturnType<User>) => {
      if (isLeft(usersEither)) {
        throw new HttpException(usersEither.left.message, usersEither.left.status);
      }
      return usersEither.right;
    });
  }

  @ApiOkResponse({
    type: SuccessResponse<void>,
    description: 'Returns literally nothing.',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: 'Internal server error response.',
  })
  @UseGuards(JwtAuthGuard)
  @Put('login')
  public async updateLogin(
    @Request() { user }: AuthorizedRequest,
    @Body() updateUserDto: UpdateUserLoginDto,
  ): Promise<void> {
    console.log(user, updateUserDto);
    return await this._updateUserService
      .update(user.sub, updateUserDto)
      .then((usersEither: ServiceReturnType<void>) => {
        if (isLeft(usersEither)) {
          throw new HttpException(usersEither.left.message, usersEither.left.status);
        }
        return usersEither.right;
      });
  }

  @ApiOkResponse({
    type: SuccessResponse<void>,
    description: 'Returns literally nothing.',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: 'Internal server error response.',
  })
  @UseGuards(JwtAuthGuard)
  @Put('email')
  public async updateEmail(
    @Request() { user }: AuthorizedRequest,
    @Body() updateUserDto: UpdateUserEmailDto,
  ): Promise<void> {
    return await this._updateUserService
      .update(user.sub, updateUserDto)
      .then((usersEither: ServiceReturnType<void>) => {
        if (isLeft(usersEither)) {
          throw new HttpException(usersEither.left.message, usersEither.left.status);
        }
        return usersEither.right;
      });
  }

  @ApiOkResponse({
    type: SuccessResponse<void>,
    description: 'Returns literally nothing.',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: 'Internal server error response.',
  })
  @UseGuards(JwtAuthGuard)
  @Put('password')
  public async updatePassword(
    @Request() { user }: AuthorizedRequest,
    @Body() updateUserDto: UpdateUserPasswordDto,
  ): Promise<void> {
    return await this._updateUserService
      .update(user.sub, updateUserDto)
      .then((usersEither: ServiceReturnType<void>) => {
        if (isLeft(usersEither)) {
          throw new HttpException(usersEither.left.message, usersEither.left.status);
        }
        return usersEither.right;
      });
  }
}
