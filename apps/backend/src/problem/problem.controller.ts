import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiPath } from '../api-path';
import { ProblemService } from './problem.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../common/decorators';
import { SubmitProblemRequestDto } from './dto/request/submit-problem.request';
import { ProblemControllerSwagger } from './swagger';
import { SubmitProblemSwagger } from './swagger/submit-problem.swagger';

@Controller()
@ProblemControllerSwagger
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post(ApiPath.Problem.SUBMIT)
  @SubmitProblemSwagger
  async submit(
    @User() memberId: number,
    @Body() dto: SubmitProblemRequestDto) {
    await this.problemService.submit(memberId, dto.link);
  }
}
