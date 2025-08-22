import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiPath } from '../api-path';
import { ProblemService } from './problem.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubmitProblemDto } from '@banbok/shared';

@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @UseGuards(JwtAuthGuard)
  @Post(ApiPath.Problem.SUBMIT)
  async submit(@Req() req, @Body() dto: SubmitProblemDto) {
    const { memberId } = req.user;
    await this.problemService.submit(memberId, dto.link);
  }
}
