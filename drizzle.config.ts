import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "postgresql",
  migrations: {
    prefix: "supabase",
  },
});
