import { db } from "../../db/index.js";
import { mcqs } from "../../db/schema.js";
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

  if (req.method === "POST") {
    const url = new URL(req.url);
    const isBulk = url.searchParams.get("bulk") === "true";

    if (isBulk) {
      const { questions } = await req.json();
      if (!Array.isArray(questions) || questions.length === 0) {
        return Response.json({ error: "questions array is required" }, { status: 400 });
      }
      const values = questions.map((q: any) => ({
        course: q.course,
        difficulty: q.difficulty || "Medium",
        access: q.access || "free",
        question: q.question,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || null,
        status: q.status || "published",
      }));
      await db.insert(mcqs).values(values);
      return Response.json({ success: true, count: values.length });
    }

    const body = await req.json();
    const { course, difficulty, access, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, status } = body;
    if (!course || !question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    const [inserted] = await db.insert(mcqs).values({
      course,
      difficulty: difficulty || "Medium",
      access: access || "free",
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      explanation: explanation || null,
      status: status || "published",
    }).returning();

    return Response.json({ success: true, mcq: inserted });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config = {
  path: "/api/admin/mcq",
};
