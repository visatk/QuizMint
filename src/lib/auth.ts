import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@/db"; // Ensure this path matches your db/index.ts location

/**
 * Lazily initializes Better Auth.
 * Must be wrapped in an async function to await the runtime D1 database connection.
 */
export const getAuth = async () => {
  const db = await getDb();
  
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
    },
    // Add any other Better Auth plugins or configuration you require below:
    // session: { ... },
    // rateLimit: { ... },
  });
};
