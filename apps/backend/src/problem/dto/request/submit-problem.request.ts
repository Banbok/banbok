import { SubmitProblemRequestDto as ISubmitProblemDto } from '@banbok/shared';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitProblemRequestDto implements ISubmitProblemDto {
  @ApiProperty({
    example: 'https://www.acmicpc.net/problem/1000',
    description: '문제 링크',
  })
  readonly link: string;
}
