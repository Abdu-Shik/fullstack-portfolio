import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  if (!cookieStore.get("admin")) redirect("/admin/login");

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) redirect("/admin");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg mb-8">
        <Button variant="ghost" asChild>
          <Link href="/admin">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
      <form
        method="POST"
        action="/api/admin/post/update"
        className="w-full max-w-lg flex flex-col gap-4 bg-white p-6 rounded shadow"
      >
        <input type="hidden" name="id" value={post.id} />

        <h1 className="text-2xl font-bold">Edit Post</h1>

        <input
          type="text"
          name="title"
          defaultValue={post.title}
          required
          className="border rounded px-3 py-2"
        />

        <textarea
          name="content"
          defaultValue={post.content}
          required
          rows={8}
          className="border rounded px-3 py-2"
        />

        <Button type="submit" className="cursor-pointer">
          Save Changes
        </Button>
      </form>
    </main>
  );
}
