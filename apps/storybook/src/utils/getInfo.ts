import { Project, SyntaxKind } from 'ts-morph'
import { typeOfLayouts, typeOfComponents } from './AsyncImportDemo'
import classification from '../save/classification.json' with { type: 'json' }
import demo from '../save/demo.json' with { type: 'json' }

const namespacePropsRegex = /Props$/
const project = new Project({ useInMemoryFileSystem: true })
const sourceFiles = project.addSourceFilesAtPaths(['packages/components/**/*.type.ts', 'packages/layouts/**/*.type.ts'])
const result: Record<string, any> = {}
for (const sourceFile of sourceFiles) {
  // 取得 interface
  for (const iface of sourceFile.getInterfaces()) {
    const props = iface.getName().replace(namespacePropsRegex, '')
    result[props] = []
    for (const symbol of iface.getType().getProperties()) {
      const decl = symbol.getDeclarations()[0]
      result[props].push({
        name: symbol.getName(),
        type: symbol.getTypeAtLocation(decl).getText(),
        optional: symbol.isOptional?.(),
      })
    }
  }
}

export type Component = Awaited<ReturnType<typeof formatList>>[number]
export type List = { structure: string; items: Component[] }
type ComponentInfo = { id: string; props: Record<string, any>; slots: Record<string, any> }

const nameMap = new Map<string, Component>()
const idMap = new Map<string, Component>()
const pathRegex = /^(\.\.\/)+|\/[^/]+$/g
const formatList = async (globObj: Record<string, () => Promise<unknown>>) => {
  const entries = Object.entries(globObj)
  const dependents: string[] = []
  const infos = await Promise.all(
    entries.map(async ([p, promise]: [string, () => Promise<unknown>]) => {
      const component = (await promise()) as ComponentInfo
      const path = p.replace(pathRegex, '')
      const name = path.split('/').at(-1) ?? 'Unknown'
      const info = {
        path,
        name,
        id: component.id,
        props: component.props,
        slots: component.slots,
        categorys: classification[component.id as keyof typeof classification]?.categorys,
        keywords: classification[component.id as keyof typeof classification]?.keywords,
        demos: demo[component.id as keyof typeof demo] ?? [],
        interface: result[name],
      }
      nameMap.set(info.name, info)
      idMap.set(info.id, info)
      dependents.push(...(classification[component.id as keyof typeof classification]?.binding ?? []))
      return info
    }),
  )
  return infos.filter((info) => !dependents.includes(info.id))
}

export type Info = { list: List[]; nameMap: Map<string, Component>; idMap: Map<string, Component> }
export default async (): Promise<Info> => {
  return {
    list: [
      { structure: 'Components', items: await formatList(typeOfComponents) },
      { structure: 'Layouts', items: await formatList(typeOfLayouts) },
    ],
    nameMap,
    idMap,
  }
}
