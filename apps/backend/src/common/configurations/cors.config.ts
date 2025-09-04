export class CorsConfig {
  static getCorsOptions() {
    return {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      optionsSuccessStatus: 204,
      sameSite: 'lax',
    };
  }
}
