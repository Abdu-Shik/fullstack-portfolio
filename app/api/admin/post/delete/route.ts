import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const id = formData.get("id")?.toString();

  if (!id) return NextResponse.json({ error: "Missing post id" }, { status: 400 });

  await prisma.blogPost.delete({ where: { id } });

  return NextResponse.redirect("/admin");
}
