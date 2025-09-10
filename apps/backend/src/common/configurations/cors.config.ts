export class CorsConfig {
  static getCorsOptions() {
    const isProduction = process.env.NODE_ENV === 'production';

    // 개발 환경 기본값
    const developmentDefaults = {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      optionsSuccessStatus: 204,
      sameSite: 'lax' as const,
    };

    // 운영 환경 기본값
    const productionDefaults = {
      origin: process.env.FRONTEND_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      optionsSuccessStatus: 204,
      sameSite: 'none' as const,
    };

    const defaults = isProduction ? productionDefaults : developmentDefaults;

    return {
      origin: process.env.CORS_ORIGIN || defaults.origin,
      methods: process.env.CORS_METHODS || defaults.methods,
      credentials: process.env.CORS_CREDENTIALS !== 'false',
      optionsSuccessStatus: parseInt(process.env.CORS_OPTIONS_STATUS || defaults.optionsSuccessStatus.toString()),
      sameSite: (process.env.CORS_SAME_SITE as 'lax' | 'strict' | 'none') || defaults.sameSite,
    };
  }
}
