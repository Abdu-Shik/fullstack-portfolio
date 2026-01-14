import prisma from "@/lib/db"

async function main() {
    const blogPosts = [
  {
    slug: "intro-to-cpp",
    title: "Introduction to C++",
    content: `# Learn C++

## Why use C++?
- Powerful language
- Lots of libraries
- Easy to understand`
  }
];

    for(const post of blogPosts){
        await prisma.blogPost.create({
            data: post,
        })
    }

    console.log('Seed data has been inserted successfully!')
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });