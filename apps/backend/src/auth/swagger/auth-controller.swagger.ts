import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const AuthControllerSwagger = applyDecorators(
  ApiTags('Auth')
)

export const NaverLoginSwagger = applyDecorators(
  ApiOperation({
    summary: '네이버 로그인',
    description: '네이버 로그인을 진행합니다.'
  }),
);

export const LogoutSwagger = applyDecorators(
  ApiOperation({
    summary: '로그아웃',
    description: '로그아웃을 진행합니다.'
  }),
);
