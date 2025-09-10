import { COOKIE_CONFIG } from '../constants';
import { ConfigService } from '@nestjs/config';

export const getCommonCookieOptions = (configService: ConfigService) => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: COOKIE_CONFIG.SAME_SITE,
    path: '/',
    domain: isProduction ? 'banbok-coding.vercel.app' : 'localhost',
  };
};
