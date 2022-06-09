import { GetStaticProps } from "next"
import Head from "next/head"
import styles from "./styles.module.scss"
import { createClient } from "../../services/prismic"
import { PrismicText } from "@prismicio/react"
import Link from "next/link"

interface Post {
    slug: string;
    title: [];
    excerpt: string;
    updatedAt: string;
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>  
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    { posts.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <a>
                                <time>{post.updatedAt}</time>
                                <strong><PrismicText field={post.title} /></strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const client = createClient()

    const response = await client.getAllByType("post", {
        fetch: ["post.title", "post.content"],
        pageSize: 100,
    })

    const posts = response.map(post => ({
        slug: post.uid,
        title: post.data.title,
        excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? "",
        updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }))

    return {
        props: {
            posts
        }
    }
}
