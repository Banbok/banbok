import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { DatabaseModule } from '../database/database.module';
import { MemberModule } from '../member/member.module';

@Module({
  controllers: [ProblemController],
  providers: [ProblemService],
  imports: [DatabaseModule, MemberModule],
})
export class ProblemModule {}
