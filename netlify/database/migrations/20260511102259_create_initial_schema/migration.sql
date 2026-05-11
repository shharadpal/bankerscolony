CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY,
	"name" varchar(200) NOT NULL,
	"email" varchar(200) NOT NULL,
	"category" varchar(100),
	"subject" varchar(500) NOT NULL,
	"message" text NOT NULL,
	"status" varchar(20) DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY,
	"name" varchar(200) NOT NULL,
	"category" varchar(100) NOT NULL,
	"exam_type" varchar(100) NOT NULL,
	"access" varchar(20) DEFAULT 'free' NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"icon" varchar(10),
	"description" text,
	"show_on_homepage" boolean DEFAULT true NOT NULL,
	"status" varchar(20) DEFAULT 'published' NOT NULL,
	"mcq_count" integer DEFAULT 0 NOT NULL,
	"pdf_count" integer DEFAULT 0 NOT NULL,
	"test_count" integer DEFAULT 0 NOT NULL,
	"enrolled_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mcqs" (
	"id" serial PRIMARY KEY,
	"course" varchar(100) NOT NULL,
	"difficulty" varchar(20) DEFAULT 'Medium' NOT NULL,
	"access" varchar(20) DEFAULT 'free' NOT NULL,
	"question" text NOT NULL,
	"option_a" text NOT NULL,
	"option_b" text NOT NULL,
	"option_c" text NOT NULL,
	"option_d" text NOT NULL,
	"correct_answer" varchar(1) NOT NULL,
	"explanation" text,
	"status" varchar(20) DEFAULT 'published' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY,
	"key" varchar(100) NOT NULL UNIQUE,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"id" serial PRIMARY KEY,
	"user_id" varchar(200) NOT NULL,
	"mcq_id" integer NOT NULL,
	"chosen_answer" varchar(1) NOT NULL,
	"is_correct" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
