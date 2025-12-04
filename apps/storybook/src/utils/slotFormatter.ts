import content from '../save/content.json' with { type: 'json' }
import { experimental_AstroContainer } from 'astro/container'

export function getSlotContent(category: string): Record<string, string> {
  switch (category) {
    case 'image_txt':
      const image_txt = content.image_txt[0]
      return {
        default: toTxt({ title: image_txt.title, subtitle: image_txt.subtitle, text: image_txt.text }),
        image: toImage(image_txt.image),
      }
    case 'image':
      return {}
    case 'button':
      const button = content.button[0]
      return {
        default: button.text,
        icon: button.icon,
        hover: button.hover,
      }
    case 'item':
      return {}
    case 'item_image':
      return {}
    case 'title':
      return {}
    case 'list':
      return {}
    default:
      return {}
  }
}

const container = await experimental_AstroContainer.create()

type Text = {
  title: string
  subtitle: string
  text: string[]
}
function toTxt({ title, subtitle, text }: Text): string {
  // 改用 container.renderToString
  let html = ''

  if (title) html += `<h1>${title}</h1>\n`
  if (subtitle) html += `<h2>${subtitle}</h2>\n`
  text.forEach((t) => {
    html += `<p>${t}</p>\n`
  })

  return html
}

function toImage(src: string): string {
  // 改用 container.renderToString
  return `<img src="${src}" alt="" />`
}
