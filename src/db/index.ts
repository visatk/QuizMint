import { drizzle } from 'drizzle-orm/d1';
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export function getDB() {
  // OpenNext environment bindings থেকে D1 ডাটাবেস এক্সট্রাক্ট করা
  const { env } = getCloudflareContext();
  
  // Drizzle ORM এর সাথে D1 কানেক্ট করা এবং Schema ম্যাপ করা
  return drizzle(env.DB, { schema }); 
}
