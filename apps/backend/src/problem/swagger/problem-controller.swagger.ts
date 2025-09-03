import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export const ProblemControllerSwagger = applyDecorators(
  ApiTags('Problem')
)

export const SubmitProblemSwagger = applyDecorators(
  ApiOperation({
    summary: '문제 제출',
    description: '사용자가 푼 문제를 제출합니다.'
  }),
)
