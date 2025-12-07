import content from '../save/content.json' with { type: 'json' }

export async function getSlotContent(category: string, contentsStyle?: Record<string, string>): Promise<Record<string, string>> {
  switch (category) {
    case 'image_txt':
      const image_txt = content.image_txt[0]
      return {
        default: await toTxt({ title: image_txt.title, subtitle: image_txt.subtitle, text: image_txt.text, style: contentsStyle?.['Text'] }),
        image: await toImage({ src: image_txt.image, style: contentsStyle?.['Image'] }),
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

type Text = {
  title: string
  subtitle: string
  text: string[]
  style?: string
}
async function toTxt(props: Text): Promise<string> {
  const html = await fetch('render/self/Text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      props,
    }),
  }).then((res) => res.text())
  return html
}

type Image = {
  src: string
  style?: string
}
async function toImage(props: Image): Promise<string> {
  const html = await fetch('render/self/Image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      props,
    }),
  }).then((res) => res.text())
  return html
}
