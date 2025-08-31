import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/problem.schema';
import { MemberService } from '../member/member.service';
import { Site } from './enums/site.enum';
import { problem } from './schema';

@Injectable()
export class ProblemService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly memberService: MemberService,
  ) {
  }

  async submit(memberId: number, link: string) {
    const [member, submittedProblem] = await Promise.all([
      this.memberService.findById(memberId),
      this.isSubmitted(memberId, link),
    ]);

    if (!member) {
      throw new BadRequestException(
        '존재하지 않는 멤버입니다.',
      );
    }

    if (submittedProblem) {
      throw new BadRequestException(
        '이미 제출된 문제입니다.',
      );
    }

    await this.database.insert(problem).values({
      problemUrl: link,
      site: this.extractSite(link),
      memberId: memberId,
    });
  }

  private async isSubmitted(memberId: number, link: string) {
    const problem = await this.database.query.problem.findFirst({
      where: (problem, { eq, and }) =>
        and(eq(problem.memberId, memberId), eq(problem.problemUrl, link)),
    });

    return !!problem;
  }

  private extractSite(link: string): Site {
    if (!this.isValidUrl(link)) {
      throw new BadRequestException(
        '올바르지 않은 URL 입니다.',
      );
    }

    switch (true) {
      case link.includes('acmicpc.net'):
        return Site.BAEKJOON;
      case link.includes('programmers.co.kr'):
        return Site.PROGRAMMERS;
      case link.includes('leetcode.com'):
        return Site.LEETCODE;
      default:
        return Site.ETCS;
    }
  }

  private isValidUrl(link: string): boolean {
    try {
      new URL(link);
      return true;
    } catch (error) {
      return false;
    }
  }
}
