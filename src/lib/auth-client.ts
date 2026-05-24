import { createAuthClient } from "better-auth/react";

// Edge-optimized auth client setup
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // 2FA এবং অন্যান্য প্লাগিনের টাইপ সাপোর্ট যুক্ত করার জন্য
  plugins: [
    // Future: twoFactorClient() if using 2FA plugin
  ]
});
