import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { problem } from '../../problem/schema';
import { baseColumns } from '../../common/db/base.schema';

export const member = pgTable('member', {
  ...baseColumns,
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  provider: text('provider').notNull(),
  providerId: text('providerId').notNull(),
  profileImage: text('profileImage'),
});

export const memberRelations = relations(member, ({ many }) => ({
  problem: many(problem),
}));
