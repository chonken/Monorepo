import type { APIRoute } from 'astro'
import { getConfig } from '../../../server/services/configs'

export const GET: APIRoute = async ({ params }) => {
  const { config = '' } = params

  const data = getConfig(config)

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}