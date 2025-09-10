import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (err || !user) {
      let message = '인증에 실패했습니다';
      let reason = 'UNKNOWN';

      if (info?.name === 'TokenExpiredError') {
        message = '토큰이 만료되었습니다';
        reason = 'TOKEN_EXPIRED';
      } else if (info?.name === 'JsonWebTokenError') {
        message = '유효하지 않은 토큰입니다';
        reason = 'INVALID_TOKEN';
      } else if (info?.message === 'No auth token') {
        message = '인증 토큰이 제공되지 않았습니다';
        reason = 'NO_TOKEN';
      }

      this.logger.warn(`JWT 인증 실패 ${request.method} ${request.url}: ${reason} - ${message}`);

      throw new UnauthorizedException({
        message,
        reason,
        statusCode: 401
      });
    }

    return user;
  }
}
