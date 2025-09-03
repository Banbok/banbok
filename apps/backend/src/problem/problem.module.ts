import { Module } from '@nestjs/common';
import { ProblemController } from './controller';
import { ProblemService } from './service';
import { ProblemRepository } from './repository';
import { DatabaseModule } from '../database/database.module';
import { MemberModule } from '../member/member.module';

@Module({
  controllers: [ProblemController],
  providers: [ProblemService, ProblemRepository],
  imports: [DatabaseModule, MemberModule],
  exports: [ProblemService],
})
export class ProblemModule {
}
