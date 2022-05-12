import * as prismic from '@prismicio/client'

export const endpoint = prismic.getEndpoint('ignewsus')
export const repositoryName = prismic.getRepositoryName(endpoint)

export function getPrismicClient(req?: unknown) {
    const client = prismic.createClient(endpoint, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
    })

  return client
}