import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";

export const mcqs = pgTable("mcqs", {
  id: serial("id").primaryKey(),
  course: varchar("course", { length: 100 }).notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull().default("Medium"),
  access: varchar("access", { length: 20 }).notNull().default("free"),
  question: text("question").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  optionC: text("option_c").notNull(),
  optionD: text("option_d").notNull(),
  correctAnswer: varchar("correct_answer", { length: 1 }).notNull(),
  explanation: text("explanation"),
  status: varchar("status", { length: 20 }).notNull().default("published"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }),
  subject: varchar("subject", { length: 500 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 200 }).notNull(),
  mcqId: integer("mcq_id").notNull(),
  chosenAnswer: varchar("chosen_answer", { length: 1 }).notNull(),
  isCorrect: boolean("is_correct").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  examType: varchar("exam_type", { length: 100 }).notNull(),
  access: varchar("access", { length: 20 }).notNull().default("free"),
  price: integer("price").notNull().default(0),
  icon: varchar("icon", { length: 10 }),
  description: text("description"),
  showOnHomepage: boolean("show_on_homepage").notNull().default(true),
  status: varchar("status", { length: 20 }).notNull().default("published"),
  mcqCount: integer("mcq_count").notNull().default(0),
  pdfCount: integer("pdf_count").notNull().default(0),
  testCount: integer("test_count").notNull().default(0),
  enrolledCount: integer("enrolled_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
