CREATE TABLE "projects_to_repos" (
	"project_id" integer NOT NULL,
	"repo_id" integer NOT NULL,
	CONSTRAINT "projects_to_repos_project_id_repo_id_pk" PRIMARY KEY("project_id","repo_id")
);
--> statement-breakpoint
ALTER TABLE "projects_to_repos" ADD CONSTRAINT "projects_to_repos_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_repos" ADD CONSTRAINT "projects_to_repos_repo_id_repos_id_fk" FOREIGN KEY ("repo_id") REFERENCES "public"."repos"("id") ON DELETE no action ON UPDATE no action;