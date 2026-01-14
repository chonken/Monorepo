import type { APIRoute } from 'astro'
import { updateConfig } from '../../server/services/configs'

export const post: APIRoute = async ({ request }) => {
  const body = await request.json()
  updateConfig(body)

  return new Response('更新成功', {
    headers: { 'Content-Type': 'application/json' },
  })
}
