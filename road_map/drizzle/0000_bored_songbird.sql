CREATE TABLE "content" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(50) NOT NULL,
	"chapter" varchar(255) NOT NULL,
	"concept" varchar(255) NOT NULL,
	"order_index" integer NOT NULL,
	"video_title" varchar(255) NOT NULL,
	"video_url" text NOT NULL,
	"quiz_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"question_number" integer NOT NULL,
	"question_type" varchar(10) NOT NULL,
	"question_text" text NOT NULL,
	"question_image" text,
	"optionA_text" text,
	"optionA_image" text,
	"optionB_text" text,
	"optionB_image" text,
	"optionC_text" text,
	"optionC_image" text,
	"optionD_text" text,
	"optionD_image" text,
	"answer_key" varchar(5),
	"numeric_answer" integer,
	"solution_text" text,
	"solution_image" text
);
