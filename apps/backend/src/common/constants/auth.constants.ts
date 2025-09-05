export const JWT_EXPIRES_IN = '1d';

export const COOKIE_CONFIG = {
  SAME_SITE: 'lax' as const,
  MAX_AGE: 24 * 60 * 60 * 1000, // 하루 (밀리초)
  ACCESS_TOKEN_COOKIE_KEY: 'accessToken',
};

export const OAUTH_URLS = {
  NAVER: {
    AUTHORIZE: 'https://nid.naver.com/oauth2.0/authorize',
    TOKEN: 'https://nid.naver.com/oauth2.0/token',
    PROFILE: 'https://openapi.naver.com/v1/nid/me',
  },
};

export const OAUTH_SCOPES = {
  NAVER: 'name email',
};
