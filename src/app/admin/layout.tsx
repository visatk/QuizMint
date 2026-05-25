import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth"; // Changed from auth
import { headers } from "next/headers";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuth(); // Initialize auth
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.role || session.user.role !== 'admin') {
    redirect("/login");
  }

  return <>{children}</>;
}
