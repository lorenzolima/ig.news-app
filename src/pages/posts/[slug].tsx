import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { RichText } from "prismic-dom"
import { getPrismicClient } from '../../services/prismic'

export default function Post() {
    return (
        <h1>test</h1>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })

    const { slug } = params;

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: RichText.asHtml(response.data.title),
        content: response.data.content.text,
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })        
    }

    return {
        props: {
            post,
        }
    }
}