import Head from 'next/head';
import styles from './styles.module.scss';
import { getPrismicClient } from '../../services/prismic'
import { GetStaticProps } from 'next';
import Link from 'next/link';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps ) {
    return (
        <>
        <Head>
            <title>Posts | ig.news</title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                { posts.map(post => 
                    <Link key={post.slug} href={`/posts/${post.slug}`}>
                    <a key={post.slug}>
                        <time>{post.updatedAt}</time>
                        <strong>{post.title}</strong>
                        <p>{post.excerpt}</p>
                    </a>
                    </Link>
                )}
            </div>
        </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const client = getPrismicClient()

    const responseConfig = {
        fetchLinks: ['post.title', 'post.content'],
        pageSize: 100,
    }
  
    const response = await client.getAllByType('post', responseConfig)

    const posts = response.map(post => {
        return {
            slug: post.uid,
            title: post.data.Title[0].text,
            excerpt: post.data.content.find(content => content.type == 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }) 
        };
    })
    //console.log(JSON.stringify(response, null, 2))
  
    return {
        props: { posts },
    }  
} 
  