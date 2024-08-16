import Image from "next/image";
import Link from "next/link";
import { use } from "react";

async function getPosts(){
  const res = await fetch("/api/posts");
  return res.json();
}


export default function Home() {
  const posts = use(getPosts());
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <link href={'/posts/${post.id}'}>{post.title}</link>
          </li>
        ))}
      </ul>
      <Link href="/post/new">Create New Post</Link>

    </div>
  );
}
