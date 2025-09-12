import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Cron } from '@nestjs/schedule';
import { QUEUE_NAMES, CRON_EXPRESSIONS } from '../../common/constants';

@Injectable()
export class TaskService {
  constructor(
    @InjectQueue(QUEUE_NAMES.DAILY_PROBLEM_REMINDER) private readonly taskQueue: Queue,
  ) {
  }

  @Cron(CRON_EXPRESSIONS.EVERYDAY_9AM, {
    timeZone: 'Asia/Seoul',
  }) // 매일 오전 9시에 실행
  async scheduleReminderCheck() {
    await this.taskQueue.add(QUEUE_NAMES.DAILY_PROBLEM_REMINDER, {
      scheduledAt: new Date(),
    });
    console.log('Daily problem reminder check scheduled');
  }
}
