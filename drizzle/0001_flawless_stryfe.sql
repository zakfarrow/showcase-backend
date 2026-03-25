CREATE TABLE "repos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"html_url" text NOT NULL,
	"homepage" text,
	"language" text,
	"topics" text[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"fork" boolean DEFAULT false NOT NULL,
	"archived" boolean DEFAULT false NOT NULL
);
