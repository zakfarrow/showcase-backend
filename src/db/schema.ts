import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status", { enum: ["ACTIVE", "ARCHIVED", "COMPLETED"] })
    .notNull()
    .default("ACTIVE"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const repos = pgTable("repos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  html_url: text("html_url").notNull(),
  homepage: text("homepage"),
  language: text("language"),
  topics: text("topics").array().notNull().default([]),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  fork: boolean("fork").notNull().default(false),
  archived: boolean("archived").notNull().default(false),
});

export const projectsToRepos = pgTable(
  "projects_to_repos",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id),
    repoId: integer("repo_id")
      .notNull()
      .references(() => repos.id),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.repoId] })],
);

export const projectsRelations = relations(projects, ({ many }) => ({
  projectsToRepos: many(projectsToRepos),
}));

export const reposRelations = relations(repos, ({ many }) => ({
  projectsToRepos: many(projectsToRepos),
}));

export const projectsToReposRelations = relations(projectsToRepos, ({ one }) => ({
  project: one(projects, {
    fields: [projectsToRepos.projectId],
    references: [projects.id],
  }),
  repo: one(repos, {
    fields: [projectsToRepos.repoId],
    references: [repos.id],
  }),
}));
