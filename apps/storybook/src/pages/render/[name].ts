import type { APIRoute } from 'astro'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import { experimental_AstroContainer } from 'astro/container'
import { components } from '../../utils/AsyncImportDemo.js'

export const GET: APIRoute = async ({ params }) => {
  const { name = '' } = params

  const componentKey = Object.keys(components).find((k) => k.includes(name))
  const Component = componentKey ? ((await components[componentKey]()) as { default: AstroComponentFactory }).default : null

  if (Component) {
    const container = await experimental_AstroContainer.create()
    const html = await container.renderToString(Component, {
      props: {},
    })

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } else {
    return new Response(`找不到組件: ${name}`, { status: 404 })
  }
}
