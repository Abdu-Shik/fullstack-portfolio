import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies(); 

    cookieStore.delete({
      name: "admin",
      path: "/", // optional
    });

    return NextResponse.redirect("/admin/login", 303);
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


