import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/constants';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Member } from '../schema';
import * as schema from '../schema';

@Injectable()
export class MemberRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {
  }

  async findAll() {
    return this.database.select().from(Member);

  }

  async findById(id: number) {
    return this.database.query.Member.findFirst({
      where: eq(Member.id, id),
    });
  }

  async findByEmail(email: string) {
    return this.database.query.Member.findFirst({
      where: eq(Member.email, email),
    });
  }

  async insert(req: typeof schema.Member.$inferInsert) {
    return this.database.insert(Member).values(req).returning();
  }
}
