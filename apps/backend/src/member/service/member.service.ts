import { Injectable } from '@nestjs/common';
import * as schema from '../schema/member.schema';
import { MemberRepository } from '../repository';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
  ) {
  }

  async getAll() {
    return await this.memberRepository.findAll();
  }

  async getById(id: number) {
    return await this.memberRepository.findById(id);
  }

  async getByEmail(email: string) {
    return await this.memberRepository.findByEmail(email);
  }

  async create(req: typeof schema.member.$inferInsert) {
    return await this.memberRepository.insert(req);
  }
}
