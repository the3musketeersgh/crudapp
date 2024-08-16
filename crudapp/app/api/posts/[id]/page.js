'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Post({ params }) {
  const router = useRouter();
  const { id } = params;
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
    }

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    setIsEditing(false);
    router.refresh();
  };

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    router.push('/');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
