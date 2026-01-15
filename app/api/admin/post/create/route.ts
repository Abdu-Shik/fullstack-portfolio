import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")         // spaces → dash
    .replace(/-+/g, "-");         // collapse dashes
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Base slug
  let slug = slugify(title);

  // Ensure uniqueness
  let uniqueSlug = slug;
  let counter = 1;

  while (
    await prisma.blogPost.findUnique({ where: { slug: uniqueSlug } })
  ) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  await prisma.blogPost.create({
    data: {
      title,
      slug: uniqueSlug,
      content,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.redirect(`${baseUrl}/admin`, 303);
}
