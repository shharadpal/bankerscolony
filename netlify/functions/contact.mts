import { db } from "../../db/index.js";
import { contactSubmissions } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { name, email, category, subject, message } = await req.json();
  if (!name || !email || !subject || !message) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  await db.insert(contactSubmissions).values({
    name,
    email,
    category: category || "General",
    subject,
    message,
  });

  return Response.json({ success: true, message: "Message sent successfully" });
};

export const config = {
  path: "/api/contact",
};
