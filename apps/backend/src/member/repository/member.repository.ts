import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/constants';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { member } from '../schema';
import * as schema from '../schema';

@Injectable()
export class MemberRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {
  }

  async findAll() {
    return this.database.select().from(member);

  }

  async findById(id: number) {
    return this.database.query.member.findFirst({
      where: eq(member.id, id),
    });
  }

  async findByEmail(email: string) {
    return this.database.query.member.findFirst({
      where: eq(member.email, email),
    });
  }

  async insert(req: typeof schema.member.$inferInsert) {
    return this.database.insert(member).values(req).returning();
  }
}
