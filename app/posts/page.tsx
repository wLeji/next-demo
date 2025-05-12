import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost, getPosts } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Code } from "@/components/code";
import { Row } from "@/components/row";

export default async function Page() {
  const posts = await getPosts();

  return (
    <Row>
      <div className="flex flex-col gap-4">
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>

        <form action={createPost}>
          <Label htmlFor="title">Title</Label>
          <Input type="text" name="title" />
          <Label htmlFor="content">Content</Label>
          <Input type="text" name="content" />
          <Button type="submit">Create</Button>
        </form>
      </div>
      <div>
        <Code path="/app/posts/page.tsx" />
        <Code path="/app/posts/loading.tsx" />
        <Code path="/lib/actions.ts" sub={[21, 37]} />
      </div>
    </Row>
  );
}
