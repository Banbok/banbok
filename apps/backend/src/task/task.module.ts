import { Module } from '@nestjs/common';
import { TaskService } from './service';
import { TaskController } from './controller';
import { TaskProcessor } from './processor';
import { BullModule } from '@nestjs/bullmq';
import { ProblemModule } from '../problem/problem.module';
import { MailModule } from '../mail/mail.module';
import { QUEUE_NAMES } from '../common/constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.DAILY_PROBLEM_REMINDER,
    }),
    ProblemModule,
    MailModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskProcessor],
})
export class TaskModule {
}
