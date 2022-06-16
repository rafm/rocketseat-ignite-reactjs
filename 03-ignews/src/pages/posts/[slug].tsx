import { PrismicRichText } from "@prismicio/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { createClient } from "../../services/prismic";
import styles from "./post.module.scss"

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: [];
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div className={styles.postContent}>
                        <PrismicRichText field={post.content} />
                    </div>
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params: { slug } }) => {
    const session = await getSession({ req })

    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    
    const prismic = createClient()

    const response = await prismic.getByUID("post", String(slug))

    return {
        props: {
            post: {
                slug,
                title: response.data.title[0].text,
                content: response.data.content,
                updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })
            }
        }
    }
}
