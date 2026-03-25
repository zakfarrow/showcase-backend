import { Repo } from "@src/db/types";

export class GitHubAPIClient {
  #baseURL = "https://api.github.com";
  #auth = process.env.GITHUB_PAT;
  constructor() {}

  async get(slug: string) {
    const req = new Request(`${this.#baseURL}${slug}`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.#auth}`,
        "X-GitHub-Api-Version": "2026-03-10",
      },
    });

    const res = await fetch(req);

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return (data as Record<string, unknown>[]).map(
      (repo): Repo => ({
        id: repo.id as number,
        name: repo.name as string,
        description: repo.description as string | null,
        html_url: repo.html_url as string,
        homepage: repo.homepage as string | null,
        language: repo.language as string | null,
        topics: repo.topics as string[],
        created_at: new Date(repo.created_at as string),
        updated_at: new Date(repo.updated_at as string),
        fork: repo.fork as boolean,
        archived: repo.archived as boolean,
      }),
    );
  }
}
