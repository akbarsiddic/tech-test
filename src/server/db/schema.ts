// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * POSTGRES_URL instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `tech-test_${name}`);

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

// export const statusEnum = pgEnum("status", ["open", "closed"]);

// export const approvedEnum = pgEnum("approved", ["yes", "no"]);

export const tickets = createTable(
  "ticket",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    description: varchar("description", { length: 1024 }),
    customer_name: varchar("customer_name", { length: 256 }),
    priority: priorityEnum("priority"),
    status: boolean("status").default(true),
    approved: boolean("approved").default(false),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
