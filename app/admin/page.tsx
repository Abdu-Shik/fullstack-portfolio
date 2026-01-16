import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminPage() {
  // --- CHECK IF ADMIN ---
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin");

  if (!isAdmin) redirect("/admin/login");

  // --- FETCH POSTS ---
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {/* Logout button */}
          <form method="POST" action="/api/admin/logout">
            <Button
              type="submit"
              className="px-4 py-2 text-white rounded hover:bg-gray-600 cursor-pointer"
            >
              Logout
            </Button>
          </form>
        </div>

        {/* Create Post */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Create New Post</h2>
          <form method="POST" action="/api/admin/post/create" className="flex flex-col gap-2">
            <Input
              type="text"
              name="title"
              placeholder="Post title"
              required
              className="border rounded px-3 py-2"
            />
            <Textarea
              name="content"
              placeholder="Content"
              required
              className="border rounded px-3 py-2"
            />
            <Button
              type="submit"
              className="px-4 py-2 text-white rounded hover:bg-gray-600 cursor-pointer"
            >
              Create Post
            </Button>
          </form>
        </div>

        {/* Posts list */}
        <div>
          <h2 className="text-xl font-semibold mb-2">All Posts</h2>
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Card 
                key={post.id}
                className="bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-stretch">
                  {/* Left: title + date */}
                  <Link href={`/blog/${post.slug}`} className="flex-1 flex flex-col justify-center px-2 py-4 hover:underline">
                    <div>
                      <CardTitle>
                        
                          {post.title}
                        
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>

                  {/* Right: actions */}
                  <div className="ml-auto flex items-center gap-2">
                    <Link href={`/admin/edit/${post.id}`}>
                      <Button size="sm" variant="outline" className="cursor-pointer">
                        Edit
                      </Button>
                    </Link>

                    <form method="POST" action="/api/admin/post/delete">
                      <input type="hidden" name="id" value={post.id} />
                      <Button
                        type="submit"
                        size="sm"
                        className="cursor-pointer hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
