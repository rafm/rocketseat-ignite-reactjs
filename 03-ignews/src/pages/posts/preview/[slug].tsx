import { PrismicRichText } from "@prismicio/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createClient } from "../../../services/prismic";
import styles from "../post.module.scss"

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: [];
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session, router, post])
    
    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div className={`${styles.postContent} ${styles.previewContent}`}>
                        <PrismicRichText field={post.content} />
                    </div>
                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a>Subscribe now 🤗</a>
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
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
    const prismic = createClient()

    const response = await prismic.getByUID("post", String(slug))

    return {
        props: {
            post: {
                slug,
                title: response.data.title[0].text,
                content: response.data.content.slice(0, 3),
                updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })
            }
        },
        revalidate: 60 * 30 // 30 minutes
    }
}
