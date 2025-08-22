import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiPath } from '../api-path';
import { ProblemService } from './problem.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubmitProblemDto } from '@banbok/shared';
import { User } from '../common/decorators/user.decorator';

@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post(ApiPath.Problem.SUBMIT)
  async submit(@User() memberId: number, @Body() dto: SubmitProblemDto) {
    await this.problemService.submit(memberId, dto.link);
  }
}
