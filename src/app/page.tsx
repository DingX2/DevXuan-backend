'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { type PostModel } from './types';

export default function Home() {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/posts').then((res) => {
            setPosts(res.data);
        });
    }, [posts]);

    const handlerDelete = (id: number) => {
        axios.delete(`/api/posts/${id}`);
    };

    const handleUpdate = (id: number) => {
        router.push(`/update/${id}`);
    };

    return (
        <div>
            <h1>게시판 목록</h1>
            <Link href="/create">새 글 쓰기</Link>
            {posts.map((post: PostModel) => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <button type="button" onClick={() => handlerDelete(post.id)}>
                        삭제
                    </button>
                    <button type="button" onClick={() => handleUpdate(post.id)}>
                        수정
                    </button>
                </div>
            ))}
            <Link href="#section1" scroll={false}>
                섹션 1로 이동
            </Link>
            <Link href="#section2">섹션 2로 이동</Link>
            <div style={{ height: '100vh' }}>테스트용공간</div>
            <div id="section1">
                <h2>섹션 1</h2>
                <p>이곳은 섹션 1입니다.</p>
            </div>
            <div style={{ height: '100vh' }}>테스트용공간22</div>
            <div id="section2">
                <h2>섹션 2</h2>
                <p>이곳은 섹션 2입니다.</p>
            </div>
        </div>
    );
}
