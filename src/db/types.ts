import { InferSelectModel } from "drizzle-orm";
import { repos } from "./schema";

export type Repo = InferSelectModel<typeof repos>;
