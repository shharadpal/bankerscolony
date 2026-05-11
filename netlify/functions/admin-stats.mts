import { db } from "../../db/index.js";
import { mcqs, contactSubmissions, userProgress } from "../../db/schema.js";
import { sql } from "drizzle-orm";
import { getUser } from "@netlify/identity";

export default async (req: Request) => {
  const user = await getUser();
  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const roles: string[] = (user.app_metadata as any)?.roles || [];
  if (!roles.includes("admin")) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const [mcqStats] = await db
    .select({
      total: sql<number>`count(*)`,
      published: sql<number>`count(*) filter (where ${mcqs.status} = 'published')`,
    })
    .from(mcqs);

  const [contactStats] = await db
    .select({
      total: sql<number>`count(*)`,
      unread: sql<number>`count(*) filter (where ${contactSubmissions.status} = 'new')`,
    })
    .from(contactSubmissions);

  const [progressStats] = await db
    .select({
      totalAttempts: sql<number>`count(*)`,
      uniqueUsers: sql<number>`count(distinct ${userProgress.userId})`,
    })
    .from(userProgress);

  return Response.json({
    mcqs: {
      total: Number(mcqStats.total),
      published: Number(mcqStats.published),
    },
    contacts: {
      total: Number(contactStats.total),
      unread: Number(contactStats.unread),
    },
    activity: {
      totalAttempts: Number(progressStats.totalAttempts),
      uniqueUsers: Number(progressStats.uniqueUsers),
    },
  });
};

export const config = {
  path: "/api/admin/stats",
};
