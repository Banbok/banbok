import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';
import { problem } from '../schema';
import { member } from '../../member/schema';
import * as schema from '../schema';

@Injectable()
export class ProblemRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {
  }

  async findAll() {
    return this.database.select().from(problem);
  }

  async findByMemberIdAndUrl(memberId: number, problemUrl: string) {
    return this.database.query.problem.findFirst({
      where: and(eq(problem.memberId, memberId), eq(problem.problemUrl, problemUrl)),
    });
  }

  async insert(req: typeof schema.problem.$inferInsert) {
    return this.database.insert(problem).values(req).returning();
  }

  async findProblemsWithMembers() {
    return this.database
      .select({
        id: problem.id,
        problemUrl: problem.problemUrl,
        site: problem.site,
        createdAt: problem.createdAt,
        memberId: problem.memberId,
        member: {
          id: member.id,
          email: member.email,
          name: member.name,
        },
      })
      .from(problem)
      .innerJoin(member, eq(problem.memberId, member.id));
  }
}
