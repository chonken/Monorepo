export type Demo = {
  name: string
  category: string
  example: Record<string, unknown>
  contents: Record<string, string>
  styles: Record<string, string>
  description: Record<string, string>
}
export type Item = {
  path: string
  name: string
  props: Record<string, unknown>
  slots: any
  defaultProps: Record<string, unknown>
  categorys: string[]
  keywords: string[]
  demos: Demo[]
}
