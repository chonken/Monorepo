import type { APIRoute } from 'astro'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import { experimental_AstroContainer } from 'astro/container'
import { components } from '../../utils/AsyncImportDemo.js'

export const GET: APIRoute = async ({ params, url }) => {
  const { name = '' } = params

  // 從 components 中找到對應的組件
  const componentKey = Object.keys(components).find((k) => k.includes(name))
  const Component = componentKey ? ((await components[componentKey]()) as { default: AstroComponentFactory }).default : null

  // 解析 URL 中的參數，然後傳給組件
  const props: Record<string, string> = {}
  url.searchParams.forEach((value, key) => {
    props[key] = value
  })

  if (Component) {
    const container = await experimental_AstroContainer.create()
    const html = await container.renderToString(Component, {
      props,
    })

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } else {
    return new Response(`找不到組件: ${name}`, { status: 404 })
  }
}

export const POST: APIRoute = async ({ request, params }) => {
  const { name = '' } = params
  const { props, slots } = await request.json()

  // 從 components 中找到對應的組件
  const componentKey = Object.keys(components).find((k) => k.includes(name))
  const Component = componentKey ? ((await components[componentKey]()) as { default: AstroComponentFactory }).default : null

  if (Component) {
    const container = await experimental_AstroContainer.create()
    const html = await container.renderToString(Component, {
      props,
      slots,
    })

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } else {
    return new Response(`找不到組件: ${name}`, { status: 404 })
  }
}
