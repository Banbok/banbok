import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ProblemControllerSwagger = applyDecorators(
  ApiTags('Problem')
)
