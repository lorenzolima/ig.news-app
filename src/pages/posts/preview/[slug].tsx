import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/react";

import Head from "next/head"
import Link from "next/link";
import { useRouter } from "next/router";

import { RichText } from "prismic-dom"
import { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { getPrismicClient } from '../../../services/prismic'

import styles from '../post.module.scss'


interface PostPreviewProps {
    postPreview: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview( { postPreview }: PostPreviewProps) {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${postPreview.slug}`)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>{postPreview.title} | Ignews</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{postPreview.title}</h1>
                    <time>{postPreview.updatedAt}</time>
                    
                    <div className={`${styles.postContent} ${styles.postPreviewContent}`}>
                        {ReactHtmlParser(postPreview.content)}
                    </div>
                    
                    <div className={styles.continueReading}>
                        Want to continue reading?
                        <Link href='/'>
                            <a href=''>Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>

        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

// We made the ServerProps first, after it we send this data to 'Post' function
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug), {})

    const postPreview = {
        slug,
        title: response.data.Title[0].text,
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })        
    }

    return {
        props: {
            postPreview,
        },
        redirect: 60 * 30,
    }
}