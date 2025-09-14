import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MemberService } from '../../member/service';
import { ProblemRepository } from '../repository';
import { Site } from '../enums';
import { TIME_CONSTANTS } from '../../common/constants';
import { SubmitProblemRequestDto } from '../dto/request/submit-problem.request';

@Injectable()
export class ProblemService {
  constructor(
    private readonly problemRepository: ProblemRepository,
    private readonly memberService: MemberService,
  ) {
  }

  async getList(memberId: number) {
    if (!(await this.memberService.getById(memberId))) {
      throw new NotFoundException('존재하지 않는 멤버입니다.');
    }

    return this.problemRepository.findAllByMemberId(memberId);
  }


  async submit(memberId: number, dto: SubmitProblemRequestDto): Promise<void> {
    const { link, title } = dto;
    await this.validateSubmission(memberId, link);

    await this.problemRepository.insert({
      problemUrl: link,
      title: title,
      site: this.extractSite(link),
      memberId: memberId,
    });
  }

  async isAlreadySubmitted(memberId: number, problemUrl: string): Promise<boolean> {
    const existingProblem = await this.problemRepository.findByMemberIdAndUrl(memberId, problemUrl);
    return !!existingProblem;
  }

  async getProblemsForReminderDays(days: number[]) {
    let allProblems;
    try {
      allProblems = await this.problemRepository.findProblemsWithMembers();
    } catch (error) {
      console.error('Error fetching problems with members:', error);
      throw error;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allProblems
      .map(item => ({
        ...item,
        daysAgo: this.calculateDaysAgo(today, item.createdAt)
      }))
      .filter(item => days.includes(item.daysAgo));
  }

  private async validateSubmission(memberId: number, link: string): Promise<void> {
    const [member, isSubmitted] = await Promise.all([
      this.memberService.getById(memberId),
      this.isAlreadySubmitted(memberId, link),
    ]);

    if (!member) {
      throw new BadRequestException('존재하지 않는 멤버입니다.');
    }

    if (isSubmitted) {
      throw new BadRequestException('이미 제출된 문제입니다.');
    }

    if (!this.isValidUrl(link)) {
      throw new BadRequestException('올바르지 않은 URL 입니다.');
    }

    if (this.isNotSupportedSite(link)) {
      throw new BadRequestException('지원하지 않는 사이트입니다. (백준, 프로그래머스, 리트코드만 지원)');
    }
  }

  private isNotSupportedSite(link: string): boolean {
    return !this.extractSite(link);
  }

  private extractSite(link: string): Site | null {
    const sitePatterns = [
      { pattern: 'acmicpc.net', site: Site.BAEKJOON },
      { pattern: 'programmers.co.kr', site: Site.PROGRAMMERS },
      { pattern: 'leetcode.com', site: Site.LEETCODE },
    ];

    const matchedSite = sitePatterns.find(({ pattern }) => link.includes(pattern))

    if (!matchedSite) {
      throw new BadRequestException('지원하지 않는 사이트입니다. (백준, 프로그래머스, 리트코드만 지원)');
    }

    return matchedSite.site
  }

  private calculateDaysAgo(today: Date, createdAt: Date): number {
    const createdDate = new Date(createdAt);
    createdDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - createdDate.getTime();
    return Math.floor(diffTime / TIME_CONSTANTS.MS_PER_DAY);
  }

  private isValidUrl(link: string): boolean {
    try {
      new URL(link);
      return true;
    } catch {
      return false;
    }
  }
}
