import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Problem } from '../../problem/schema';
import { baseColumns } from '../../common/db/base.schema';

export const Member = pgTable('member', {
  ...baseColumns,
  email: text('email').notNull().unique(),
  name: text('name'),
  provider: text('provider').notNull(),
  providerId: text('providerId').notNull(),
  profileImage: text('profileImage'),
});

export const memberRelations = relations(Member, ({ many }) => ({
  Problem: many(Problem),
}));
