'use client';

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TurnstileWidget } from "@/components/auth/turnstile-widget";
import { processTransaction } from "@/lib/actions/wallet";
import { toast } from "sonner"; // Assuming sonner is installed via shadcn

export default function WalletProfilePage() {
  const [amount, setAmount] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTopUp = async () => {
    if (!turnstileToken) return toast.error("Please verify you are human first.");
    if (isNaN(Number(amount)) || Number(amount) <= 0) return toast.error("Invalid amount");

    setLoading(true);
    const res = await processTransaction(Number(amount) * 100, "deposit", turnstileToken); // Convert to cents
    
    if (res.success) {
      toast.success("Wallet topped up successfully!");
      setAmount("");
      window.turnstile?.reset(); // Reset widget for future transactions
      setTurnstileToken(null);
    } else {
      toast.error(res.error || "Transaction failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Wallet</h1>
        <p className="text-muted-foreground">Manage your credentials and balance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Wallet Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Credits Balance</CardTitle>
            <CardDescription>Use credits to unlock premium quizzes.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
             {/* Fetch actual balance here via SWR or Server Component wrapper */}
            <span className="text-5xl font-extrabold tracking-tighter text-primary">
              $0.00
            </span>
          </CardContent>
        </Card>

        {/* Top-up Action Card */}
        <Card>
          <CardHeader>
            <CardTitle>Top Up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="10.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            {/* Contextual Turnstile - Only appears when ready to act */}
            {amount && Number(amount) > 0 && (
              <TurnstileWidget onVerify={setTurnstileToken} />
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleTopUp} 
              disabled={!turnstileToken || loading}
            >
              {loading ? "Processing..." : "Confirm Top Up"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
