import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const MemberControllerSwagger = applyDecorators(
  ApiTags('Member'),
)

export const MyInfoSwagger = applyDecorators(
  ApiOperation({
    summary: '내 정보 조회',
    description: '내 정보를 조회합니다.',
  }),
)
