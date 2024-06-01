'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string | undefined;

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/posts/${id}`)
                .then((res) => {
                    const post = res.data;
                    setTitle(post.title);
                    setContent(post.content);
                })
                .catch((error) => {
                    console.error('Error fetching post:', error);
                });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            axios
                .put(`/api/posts/${id}`, { title, content })
                .then(() => {
                    router.push('/');
                })
                .catch((error) => {
                    console.error('Error updating post:', error);
                });
        }
    };

    return (
        <div>
            <h1>글 수정하기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>제목</h1>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <h3>내용</h3>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">수정하기</button>
            </form>
        </div>
    );
}
