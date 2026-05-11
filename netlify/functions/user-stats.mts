import { db } from "../../db/index.js";
import { userProgress, mcqs } from "../../db/schema.js";
import { eq, sql, and } from "drizzle-orm";
import { getUser } from "@netlify/identity";

export default async (req: Request) => {
  const user = await getUser();
  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [stats] = await db
    .select({
      attempted: sql<number>`count(*)`,
      correct: sql<number>`count(*) filter (where ${userProgress.isCorrect} = true)`,
      wrong: sql<number>`count(*) filter (where ${userProgress.isCorrect} = false)`,
    })
    .from(userProgress)
    .where(eq(userProgress.userId, user.id));

  const attempted = Number(stats.attempted);
  const correct = Number(stats.correct);
  const wrong = Number(stats.wrong);
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  const subjectStats = await db
    .select({
      course: mcqs.course,
      attempted: sql<number>`count(*)`,
      correct: sql<number>`count(*) filter (where ${userProgress.isCorrect} = true)`,
    })
    .from(userProgress)
    .innerJoin(mcqs, eq(userProgress.mcqId, mcqs.id))
    .where(eq(userProgress.userId, user.id))
    .groupBy(mcqs.course);

  return Response.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || "",
    },
    stats: { attempted, correct, wrong, accuracy },
    subjectStats,
  });
};

export const config = {
  path: "/api/user/stats",
};
