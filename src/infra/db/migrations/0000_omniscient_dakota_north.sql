CREATE TABLE "shortlinks" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"shortened_url" text NOT NULL,
	"access_count" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
