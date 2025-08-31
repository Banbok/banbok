import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const SubmitProblemSwagger = applyDecorators(
  ApiOperation({
    summary: '문제 제출',
    description: '사용자가 푼 문제를 제출합니다.'
  }),
)
