import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("admin", "true", {
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
