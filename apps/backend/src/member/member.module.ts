import { Module } from '@nestjs/common';
import { MemberService } from './service';
import { DatabaseModule } from '../database/database.module';
import { MemberRepository } from './repository';

@Module({
  imports: [DatabaseModule],
  providers: [MemberService, MemberRepository],
  exports: [MemberService],
})
export class MemberModule {}
