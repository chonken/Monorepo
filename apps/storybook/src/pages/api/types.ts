import type { APIRoute } from 'astro'
import types from '../../server/services/getType'

export const GET: APIRoute = async () => {
  const data = types

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
