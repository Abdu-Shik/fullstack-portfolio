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
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  if (!id || !title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // regenerate slug from updated title
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.blogPost.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      content,
      slug,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.redirect(`${baseUrl}/admin`, 303);
}
