import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/db"

export default async function Home() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc"},
    take: 3,
  })
  return (
    <main className="min-h-screen">
      {/*Hero Section*/}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Hi, I&apos;m John Doe</h1>
        <p className="text-muted-foreground text-lg max-w-md mb-6">
          A fullstack developer passionate about building great web experiences.
        </p>

        <div className="fixed bottom-6 right-6">
          <Button asChild variant="secondary" size="sm">
              <Link href="/admin/login">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Login
              </Link>
          </Button>
        </div>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/blog">Read Blog</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/comments">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Me
            </Link>
          </Button>
        </div>
      </section>

      {/*About Section*/}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-muted-foreground">
          I specialize in React, Next.js, and TypeScript. With years of experience building scalable 
          applications, I love turning ideas into reality.
        </p>
      </section>

      {/*Recent Posts Section*/}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {posts.map(post => (
              <Link href={`/blog/${post.slug}`}>
                <Card
                  key = {post.id}
                  className="hover:bg-accent transition-colors"
                >                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}

        <Button variant="link" asChild className="mt-4 px-0">
          <Link href="/blog">
            View all posts <ArrowRight className = "w-4 h-4 ml-1" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
