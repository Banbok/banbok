import { Controller, Get, HttpCode, HttpStatus, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MemberService } from '../service';
import { ApiPath } from '../../api-path';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators';

@UseGuards(JwtAuthGuard)
@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
  ) {
  }

  @Get(ApiPath.Member.MY)
  async my(
    @User() memberId: number
  ) {
    const member = await this.memberService.getById(memberId);
    return
  }
}
