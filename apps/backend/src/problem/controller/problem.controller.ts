import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiPath } from '../../api-path';
import { ProblemService } from '../service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators';
import { SubmitProblemRequestDto } from '../dto/request/submit-problem.request';
import { GetProblemsSwagger, ProblemControllerSwagger, SubmitProblemSwagger } from '../swagger';

@Controller()
@ProblemControllerSwagger
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post(ApiPath.Problem.PROBLEMS)
  @SubmitProblemSwagger
  async submit(
    @User() memberId: number,
    @Body() dto: SubmitProblemRequestDto) {
    await this.problemService.submit(memberId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(ApiPath.Problem.PROBLEMS)
  @GetProblemsSwagger
  async getProblems(@User() memberId: number) {
    return this.problemService.getList(memberId);
  }
}
