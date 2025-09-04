import { integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { Site } from '../enums';
import { relations } from 'drizzle-orm';
import { Member } from '../../member/schema';
import { baseColumns } from '../../common/db/base.schema';

export const siteEnum = pgEnum(
  'site',
  Object.values(Site) as [string, ...string[]],
);

export const Problem = pgTable('problem', {
  ...baseColumns,
  problemUrl: text('problemUrl').notNull().unique(),
  site: siteEnum('site').notNull(),
  memberId: integer('member_id').references(() => Member.id),
});

export const problemRelations = relations(Problem, ({ one }) => ({
  Member: one(Member, {
    fields: [Problem.memberId],
    references: [Member.id],
  }),
}));
