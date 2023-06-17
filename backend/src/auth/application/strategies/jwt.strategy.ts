import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from '../dto/payload.dto';

/**
 * JWT strategy.
 *
 * @description This strategy is a part of passport library. Passport strategies describe the way of
 * user authentication and validation. This strategy validates user by provided JWT. It takes JWT from
 * the HTTP header and tries to decode it. If JWT decodes, then it returns payload of this jwt.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('BACKEND_APP_JWT_SECRET'),
    });
  }

  /**
   * Validates user with provided sign in DTO.
   *
   * @param payload payload DTO.
   * @returns either error or payload DTO.
   * @see [ServiceReturnType](./../../../common/types/service-return.type.ts)
   * @see {@link https://ru.wikipedia.org/wiki/DTO | DTO (Data Transfer Object)}
   */
  public async validate(payload: PayloadDto): Promise<PayloadDto> {
    return { sub: payload.sub, email: payload.email, login: payload.login };
  }
}
