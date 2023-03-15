import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Auth Guard.
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}
