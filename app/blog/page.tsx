import prisma from "@/lib/db"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc"},
    })

    return(
        <main className="min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <Button variant="ghost" asChild className="mb-8">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </Button>
            

                <h1 className="text-2xl font-bold mb-4">Blogs</h1>
                {posts.length > 0 ? (
                    <div className='flex flex-col gap-4'>
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
            </div>
        </main>
    )
}