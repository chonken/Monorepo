import { Project, SyntaxKind } from 'ts-morph'
import { typeOfLayouts, typeOfComponents } from './AsyncImportDemo'
import classification from '../save/classification.json' with { type: 'json' }
import demo from '../save/demo.json' with { type: 'json' }

const project = new Project()
const sourceFiles = project.addSourceFilesAtPaths(['packages/components/**/*.type.ts', 'packages/layouts/**/*.type.ts'])
const result: Record<string, any> = {}
for (const sourceFile of sourceFiles) {
  // 取得 id
  let id = ''
  for (const stmt of sourceFile.getVariableStatements()) {
    for (const decl of stmt.getDeclarations()) {
      const initializer = decl.getInitializer()
      if (initializer?.getKind() === SyntaxKind.StringLiteral) {
        id = initializer.getText()
        result[id] = []
      }
    }
  }
  // 取得 interface
  for (const iface of sourceFile.getInterfaces()) {
    for (const symbol of iface.getType().getProperties()) {
      const decl = symbol.getDeclarations()[0]
      result[id].push({
        name: symbol.getName(),
        type: symbol.getTypeAtLocation(decl).getText(),
        optional: symbol.isOptional?.(),
      })
    }
  }
}

const pathRegex = /^(\.\.\/)+|\/[^/]+$/g
export const formatList = (globObj: Record<string, () => Promise<unknown>>) => {
  const entries = Object.entries(globObj)
  return Promise.all(
    entries.map(async ([p, promise]: [string, any]) => {
      const component = await promise()
      const path = p.replace(pathRegex, '')
      return {
        path,
        name: path.split('/').at(-1) ?? 'Unknown',
        id: component.id,
        props: component.props,
        slots: component.slots,
        categorys: classification[component.id as keyof typeof classification]?.categorys,
        keywords: classification[component.id as keyof typeof classification]?.keywords,
        demos: demo[component.id as keyof typeof demo] ?? [],
        interface: result[component.id],
      }
    }),
  )
}
