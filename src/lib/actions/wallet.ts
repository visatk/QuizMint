'use server';

import { getDB } from "@/db";
import { wallets, transactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { validateTurnstile } from "@/lib/security";
import { randomUUID } from "crypto";

export async function processTransaction(amount: number, type: string, turnstileToken: string) {
  const db = getDB();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const isHuman = await validateTurnstile(turnstileToken);
  if (!isHuman) throw new Error("Security verification failed");

  const idempotencyKey = randomUUID();

  try {
    await db.transaction(async (tx) => {
      let userWallet = await tx.select().from(wallets).where(eq(wallets.userId, session.user.id)).get();
      
      if (!userWallet) {
        const newWalletId = randomUUID();
        await tx.insert(wallets).values({ id: newWalletId, userId: session.user.id, balance: 0 });
        userWallet = { id: newWalletId, userId: session.user.id, balance: 0, currency: 'CREDITS', updatedAt: new Date() };
      }

      if (type === 'withdrawal' && userWallet.balance < Math.abs(amount)) {
        throw new Error("Insufficient funds");
      }

      await tx.insert(transactions).values({
        id: randomUUID(),
        walletId: userWallet.id,
        amount: amount,
        type: type,
        idempotencyKey: idempotencyKey
      });

      await tx.update(wallets)
        .set({ balance: sql`${wallets.balance} + ${amount}` })
        .where(eq(wallets.id, userWallet.id));
    });

    return { success: true, message: "Transaction processed" };
  } catch (error: any) {
    console.error("Wallet transaction failed:", error);
    return { success: false, error: error.message };
  }
}
