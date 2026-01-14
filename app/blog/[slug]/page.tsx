import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/markdown-renderer";

export default async function BlogPostPage({params}:{params: Promise<{slug: string}>}) {
    const { slug } = await params;
    console.log(slug);

    const post = await prisma.blogPost.findUnique({
        where: {slug}
    });

    if (!post){
        notFound();
    }

    return (
        <main className="min-h-screen py-16 px-4">
            <article className="max-w-3xl mx-auto">
                <Button variant="ghost" asChild className="mb-8">
                    <Link href="/blog">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>
                </Button>

                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-muted-foreground mb-8">
                    {new Date(post?.createdAt).toLocaleDateString()}
                </p>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <MarkdownRenderer content={post.content} />
                </div>
            </article>
        </main>
    )
}