import "dotenv/config";
import { repos } from "@src/db/schema";
import { db } from "@src/services/db";
import { GitHubAPIClient } from "@src/services/github";
import { sql } from "drizzle-orm";

const syncRepos = async () => {
  try {
    const gh = new GitHubAPIClient();
    const data = await gh.get("/user/repos?type=owner");

    await db
      .insert(repos)
      .values(data)
      .onConflictDoUpdate({
        target: repos.id,
        set: {
          name: sql`excluded.name`,
          description: sql`excluded.description`,
          html_url: sql`excluded.html_url`,
          homepage: sql`excluded.homepage`,
          language: sql`excluded.language`,
          topics: sql`excluded.topics`,
          created_at: sql`excluded.created_at`,
          updated_at: sql`excluded.updated_at`,
          fork: sql`excluded.fork`,
          archived: sql`excluded.archived`,
        },
      });

    console.log("Successful resync");
    console.log(await db.select().from(repos));
  } catch (error) {
    console.error("syncRepos error:", error);
  }
};

syncRepos()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
