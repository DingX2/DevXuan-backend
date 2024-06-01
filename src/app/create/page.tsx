'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        axios.post('/api/posts', { title, content }).then(() => {
            router.push('/');
        });
    };

    return (
        <div>
            <h1>새 글 쓰기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>제목</h1>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <h3>내용</h3>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">작성</button>
            </form>
        </div>
    );
}
