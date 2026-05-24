import { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Authentication | QuizMint",
  description: "Sign in or create your QuizMint account to manage interactive quizzes.",
};

export default function LoginPage() {
  return (
    <div className="container relative flex-col items-center justify-center min-h-[calc(100vh-4rem)] grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      {/* Brand & Marketing Section (High-conversion approach) */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          QuizMint
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;QuizMint has completely revolutionized how we engage with our audience. The speed of Cloudflare Edge combined with this seamless UI is unmatched.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis, Content Creator</footer>
          </blockquote>
        </div>
      </div>

      {/* Auth Component Section */}
      <div className="p-4 lg:p-8 h-full flex items-center justify-center">
        <AuthCard />
      </div>

    </div>
  );
}
