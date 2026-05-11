import { db } from "../../db/index.js";
import { mcqs } from "../../db/schema.js";
import { eq, and, ilike, sql } from "drizzle-orm";

export default async (req: Request) => {
  const url = new URL(req.url);

  if (req.method === "GET") {
    const course = url.searchParams.get("course");
    const difficulty = url.searchParams.get("difficulty");
    const access = url.searchParams.get("access");
    const search = url.searchParams.get("search");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");

    const conditions = [eq(mcqs.status, "published")];
    if (course && course !== "all") conditions.push(eq(mcqs.course, course));
    if (difficulty && difficulty !== "all") conditions.push(eq(mcqs.difficulty, difficulty));
    if (access && access !== "all") conditions.push(eq(mcqs.access, access));
    if (search) conditions.push(ilike(mcqs.question, `%${search}%`));

    const results = await db
      .select({
        id: mcqs.id,
        course: mcqs.course,
        difficulty: mcqs.difficulty,
        access: mcqs.access,
        question: mcqs.question,
        optionA: mcqs.optionA,
        optionB: mcqs.optionB,
        optionC: mcqs.optionC,
        optionD: mcqs.optionD,
        explanation: mcqs.explanation,
      })
      .from(mcqs)
      .where(and(...conditions))
      .limit(limit)
      .offset(offset);

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(mcqs)
      .where(and(...conditions));

    return Response.json({ mcqs: results, total: countResult.count });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config = {
  path: "/api/mcqs",
};
