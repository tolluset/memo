CREATE TABLE IF NOT EXISTS "memo" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memo" ADD CONSTRAINT "memo_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
