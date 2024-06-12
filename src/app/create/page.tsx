'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(title, subtitle, content, image);
            await axios.post('/api/posts', { title, subtitle, content, image });
            router.push('/');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>새 글 쓰기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>제목</h1>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <h2>부제목</h2>
                    <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
                </div>
                <div>
                    <h3>내용</h3>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                    <h3>이미지</h3>
                    <textarea value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '작성 중...' : '작성'}
                </button>
            </form>
        </div>
    );
};
