import { getDB } from "@/db";
import { eq } from "drizzle-orm";
import { withdrawals } from "@/db/schema";
import { Button } from "@/components/ui/button";

export const runtime = "edge"; // Run entirely on Cloudflare Global Edge

export default async function AdminDashboard() {
  const db = getDB();
  
  // Relations v2 এর চমৎকার ব্যবহার: Withdrawals এর সাথে User ডেটা একসাথে আনা
  const pendingRequests = await db.query.withdrawals.findMany({
    where: eq(withdrawals.status, "pending"),
    with: {
      user: true, // Joins user table automatically
    },
    orderBy: (withdrawals, { desc }) => [desc(withdrawals.createdAt)],
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Pending Withdrawals</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500">No pending requests right now.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">User Name</th>
                <th className="pb-3">Amount (BDT)</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((req) => (
                <tr key={req.id} className="border-b last:border-0">
                  <td className="py-4 font-medium text-slate-700">{req.user.name}</td>
                  <td className="py-4 text-emerald-600 font-bold">৳{req.amount}</td>
                  <td className="py-4 space-x-2">
                    {/* These buttons would call Server Actions to update DB */}
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">Approve</Button>
                    <Button size="sm" variant="destructive">Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
