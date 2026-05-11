import { db } from "../../db/index.js";
import { mcqs, userProgress } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { getUser } from "@netlify/identity";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { mcqId, chosenAnswer } = await req.json();
  if (!mcqId || !chosenAnswer) {
    return Response.json({ error: "mcqId and chosenAnswer are required" }, { status: 400 });
  }

  const [question] = await db
    .select({ correctAnswer: mcqs.correctAnswer, explanation: mcqs.explanation })
    .from(mcqs)
    .where(eq(mcqs.id, mcqId))
    .limit(1);

  if (!question) {
    return Response.json({ error: "Question not found" }, { status: 404 });
  }

  const isCorrect = chosenAnswer === question.correctAnswer;

  const user = await getUser();
  if (user) {
    await db.insert(userProgress).values({
      userId: user.id,
      mcqId,
      chosenAnswer,
      isCorrect,
    });
  }

  return Response.json({
    correct: isCorrect,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
  });
};

export const config = {
  path: "/api/mcqs/submit",
};
