import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDB } from "@/db"; 
import * as schema from "@/db/schema";

// Note: Ensure your environment is configured so that getDB() works in this context
export const auth = betterAuth({
  database: drizzleAdapter(getDB(), {
    provider: "sqlite",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  twoFactor: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, 
    updateAge: 60 * 60 * 24, 
  }
});
