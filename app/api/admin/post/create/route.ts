import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title")?.toString();
  let slug = formData.get("slug")?.toString();
  const content = formData.get("content")?.toString();

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  //  Normalize slug
  slug = slugify(slug);

  // Final validation
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Invalid slug format" },
      { status: 400 }
    );
  }

  // Check uniqueness
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "Slug already exists" },
      { status: 400 }
    );
  }

  await prisma.blogPost.create({
    data: { title, slug, content },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.redirect(`${baseUrl}/admin`, 303);
}

