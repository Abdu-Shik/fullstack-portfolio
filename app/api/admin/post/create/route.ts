import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title")?.toString();
  const slug = formData.get("slug")?.toString();
  const content = formData.get("content")?.toString();

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await prisma.blogPost.create({
    data: { title, slug, content },
  });

  // --- FIXED: use absolute URL ---
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.redirect(`${baseUrl}/admin`, 303);
}

