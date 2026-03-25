import { GitHubAPIClient } from "@src/services/github";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("GitHubAPIClient", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should call fetch with the correct URL", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });

    const service = new GitHubAPIClient();
    await service.get("/user/repos");

    const [request] = mockFetch.mock.calls[0] ?? [];

    expect(mockFetch).toHaveBeenCalledWith(expect.any(Request));
    expect(request.url).toBe("https://api.github.com/user/repos");
    expect(request.headers.get("Accept")).toBe("application/vnd.github+json");
    expect(request.headers.get("Authorization")).toBe("Bearer undefined");
  });
});
