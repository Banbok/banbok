import { Controller, Get, HttpCode, HttpStatus, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MemberService } from '../service';
import { ApiPath } from '../../api-path';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators';
import { MyInfoResponse } from '../dto';
import { MemberControllerSwagger, MyInfoSwagger } from '../swagger/member-controller.swagger';

@MemberControllerSwagger
@UseGuards(JwtAuthGuard)
@Controller()
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
  ) {
  }

  @Get(ApiPath.Member.MY)
  @MyInfoSwagger
  async my(
    @User() memberId: number
  ) {
    const member = await this.memberService.getById(memberId);
    return MyInfoResponse.from(member);
  }
}
