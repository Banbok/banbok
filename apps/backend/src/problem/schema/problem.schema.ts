import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { Site } from '../enums';
import { relations, sql } from 'drizzle-orm';
import { member } from '../../member/schema';
import { baseColumns } from '../../common/db/base.schema';

export const siteEnum = pgEnum(
  'site',
  Object.values(Site) as [string, ...string[]],
);

export const problem = pgTable('problem', {
  ...baseColumns,
  problemUrl: text('problemUrl').notNull().unique(),
  site: siteEnum('site').notNull(),
  memberId: integer('member_id').references(() => member.id),
});

export const problemRelations = relations(problem, ({ one }) => ({
  member: one(member, {
    fields: [problem.memberId],
    references: [member.id],
  }),
}));
