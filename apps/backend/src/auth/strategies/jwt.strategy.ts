import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { COOKIE_CONFIG } from '../../common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookieToken = request?.cookies?.[COOKIE_CONFIG.ACCESS_TOKEN_COOKIE_KEY];
          if (cookieToken) {
            return cookieToken;
          }

          const authHeader = request?.headers?.authorization;
          if (authHeader?.startsWith('Bearer ')) {
            return authHeader.substring(7);
          }

          this.logger.warn('쿠키와 Authorization 헤더에서 JWT 토큰을 찾을 수 없습니다');
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return {
      memberId: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
