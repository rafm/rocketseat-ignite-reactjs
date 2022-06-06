import * as prismic from '@prismicio/client'

export function createClient(config = {}) {
  return prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  })
}