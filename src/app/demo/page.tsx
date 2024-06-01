import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>게시판 목록</h1>
            <Link href="/create">새 글 쓰기</Link>
        </div>
    );
}
