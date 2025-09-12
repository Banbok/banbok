import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ProblemService } from '../../problem/service';
import { MailService } from '../../mail/service';
import { QUEUE_NAMES, REMINDER_INTERVALS, EMAIL_SUBJECTS, EMAIL_TEMPLATES } from '../../common/constants';

type MemberInfo = {
  id: number;
  email: string;
  name: string;
};

type ProblemWithMember = {
  id: number;
  title: number;
  problemUrl: string;
  site: string;
  createdAt: Date;
  memberId: number;
  member: MemberInfo;
  daysAgo: number;
};

@Processor(QUEUE_NAMES.DAILY_PROBLEM_REMINDER)
export class TaskProcessor extends WorkerHost {
  constructor(
    private readonly problemService: ProblemService,
    private readonly mailService: MailService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case QUEUE_NAMES.DAILY_PROBLEM_REMINDER:
        return this.sendProblemsToMembers(job);
    }
  }

  private async sendProblemsToMembers(job: Job) {
    const days = REMINDER_INTERVALS;

    // key: memberId, value: { member, problems: { day1: ProblemWithMember[] } }
    const reminderMap = new Map<number, {
      member: MemberInfo,
      problems: {
        day1: ProblemWithMember[],
        day3: ProblemWithMember[],
        day7: ProblemWithMember[],
        day21: ProblemWithMember[],
      }
    }>();

    // 1. 1, 3, 7, 21일 지난 모든 문제들을 멤버 정보와 함께 가져오기
    const problemsWithMembers = await this.problemService.getProblemsForReminderDays(days);

    // 2. 유저별로 그룹화
    problemsWithMembers.forEach(item => {
      if (!reminderMap.has(item.memberId)) {
        reminderMap.set(item.memberId, {
          member: item.member,
          problems: {
            day1: [],
            day3: [],
            day7: [],
            day21: [],
          }
        });
      }

      const memberData = reminderMap.get(item.memberId);
      switch (item.daysAgo) {
        case 1:
          memberData.problems.day1.push(item);
          break;
        case 3:
          memberData.problems.day3.push(item);
          break;
        case 7:
          memberData.problems.day7.push(item);
          break;
        case 21:
          memberData.problems.day21.push(item);
          break;
      }
    });

    // 3. 각 유저에게 이메일 발송 (문제가 있을 때만)
    const emailPromises = [];
    for (const [memberId, data] of reminderMap) {
      if (data.problems.day1.length > 0 ||
        data.problems.day3.length > 0 ||
        data.problems.day7.length > 0 ||
        data.problems.day21.length > 0) {
        emailPromises.push(this.mailService.sendEmail({
          to: data.member.email,
          subject: EMAIL_SUBJECTS.PROBLEM_REMINDER,
          template: EMAIL_TEMPLATES.PROBLEMS,
          context: {
            name: data.member.name,
            problemsByDays: data.problems,
          },
        }));
      }
    }
    await Promise.all(emailPromises);

    return {
      totalMembers: reminderMap.size,
      totalProblems: problemsWithMembers.length,
    };
  }
}
