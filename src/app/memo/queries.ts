"use server";

import { session } from "@/auth";
import { db } from "@/db";
import { InsertMemo, memos, SelectMemo } from "@/db/schema";
import { and, eq, gte, lt } from "drizzle-orm";

export async function upsertMemo(data: Omit<InsertMemo, "userId">) {
  const user = await session();

  await db
    .insert(memos)
    .values({ ...data, userId: user.id })
    .onConflictDoUpdate({ target: memos.id, set: data });
}

export async function getMemo(id: SelectMemo["id"]): Promise<SelectMemo> {
  const user = await session();

  const memo = await db
    .select()
    .from(memos)
    .where(and(eq(memos.userId, user.id), eq(memos.id, id)))
    .limit(1);

  return memo[0];
}

export async function getMemoToday(): Promise<SelectMemo> {
  const user = await session();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const memo = await db
    .select()
    .from(memos)
    .where(
      and(
        eq(memos.userId, user.id),
        gte(memos.created_at, today),
        lt(memos.created_at, tomorrow),
      ),
    );

  if (memo.length) {
    return memo[0];
  }

  const newMemo = await db
    .insert(memos)
    .values({ userId: user.id })
    .returning();

  return newMemo[0];
}

export async function getMemos(): Promise<SelectMemo[]> {
  const user = await session();

  return db.select().from(memos).where(eq(memos.userId, user.id));
}

export async function deleteMemo(id: SelectMemo["id"]) {
  const user = await session();

  await db
    .delete(memos)
    .where(and(eq(memos.userId, user.id), eq(memos.id, id)));
}
