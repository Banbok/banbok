import { Module } from '@nestjs/common';
import { MemberService } from './service';
import { DatabaseModule } from '../database/database.module';
import { MemberRepository } from './repository';
import { MemberController } from './controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberService],
})
export class MemberModule {
}
