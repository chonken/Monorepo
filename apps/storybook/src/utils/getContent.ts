import content from '../save/content.json' with { type: 'json' }

type Props = {
  props?: Record<string, string>
  slots?: Record<string, string>
}
export default async function getContent(category: string, contentsStyle?: Record<string, string>, index?: number): Promise<Props> {
  switch (category) {
    case 'image_txt':
      const image_txt = getData(content.image_txt)
      return {
        slots: {
          default: await toTxt({ title: image_txt.title, subtitle: image_txt.subtitle, text: image_txt.text, style: contentsStyle?.['Text'] }),
          image: await toImage({ src: image_txt.image, style: contentsStyle?.['Image'] }),
        },
      }
    case 'image':
      return {}
    case 'background':
      return {
        props: {
          src: getData(content.image)
        },
      }
    case 'button':
      const button = getData(content.button)
      return {
        slots: {
          default: button.text,
          icon: button.icon,
          hover: button.hover,
        },
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

/**
 * 取得資料
 * @param datas 資料
 * @param index 指定索引，未指定則隨機回傳
 * @returns 其中一筆資料
 */
function getData<T>(datas: T[], index?: number) {
  if (index) return datas[index]

  const len = datas.length
  const random = Math.floor(Math.random() * len)
  return datas[random]
}