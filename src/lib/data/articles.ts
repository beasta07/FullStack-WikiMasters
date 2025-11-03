import db from "@/db/index"
import { Article, articles } from "@/db/schema";
import {eq} from "drizzle-orm"
import { usersSync } from "drizzle-orm/neon";

export async function getArticles() {
  // TODO: Replace with actual database query
 const response = await db 
 .select({
  title:articles.title,
  id:articles.id,
  createdAt:articles.createdAt,
  content:articles.content,
  author:usersSync.name
 })
 .from(articles)
 .leftJoin(usersSync, eq(articles.authorId,usersSync.id))
 return response
}
export async function getArticlesById(id:number) {
  // TODO: Replace with actual database query
 const response = await db 
 .select({
  title:articles.title,
  id:articles.id,
  createdAt:articles.createdAt,
  content:articles.content,
  author:usersSync.name
 })
 .from(articles)
 .where(eq(articles.id,id))
 .leftJoin(usersSync, eq(articles.authorId,usersSync.id))
 return response[0] ? response[0] : null
}

export async function getArticleById(id: number) {
  const articles = await getArticles();
  return articles.find((a) => +a.id === id) || null;
}
