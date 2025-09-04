import { BadRequestException, Injectable } from '@nestjs/common';
import * as schema from '../schema/member.schema';
import { MemberRepository } from '../repository';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
  ) {
  }

  async getAll() {
    return this.memberRepository.findAll();
  }

  async getById(id: number) {
    const member = await this.memberRepository.findById(id);
    if (!member) {
      throw new BadRequestException('멤버가 존재하지 않습니다.');
    }
    return member;
  }

  async getByEmail(email: string) {
    return this.memberRepository.findByEmail(email);
  }

  async create(req: typeof schema.Member.$inferInsert) {
    return await this.memberRepository.insert(req);
  }
}
