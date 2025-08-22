import { integer, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { Site } from '../enums/site.enum';
import { relations } from 'drizzle-orm';
import { member } from '../../member/schema/member.schema';

export const siteEnum = pgEnum(
  'site',
  Object.values(Site) as [string, ...string[]],
);

export const problem = pgTable('problem', {
  id: serial('id').primaryKey(),
  problemUrl: text('problemUrl').notNull().unique(),
  site: siteEnum('site').notNull(),
  memberId: integer('member_id'),
});

export const problemRelations = relations(problem, ({ one }) => ({
  member: one(member, {
    fields: [problem.memberId],
    references: [member.id],
  }),
}));
