import { Project } from 'ts-morph'
import { readdirSync } from 'fs'
import { join } from 'path'

// 取得id、defaultProps、slots
const dir = 'packages/components'
const files = readdirSync(dir, { recursive: true })
  .filter((f) => f.endsWith('.type.ts'))
  .map((f) => join(dir, f))
const modules = await Promise.all(files.map((f) => import(`../${f}`)))
// OK
console.log(modules)

// 取得interface
const project = new Project()
const sourceFiles = project.addSourceFilesAtPaths(['packages/components/**/*.type.ts', 'packages/layouts/**/*.type.ts'])
for (const sourceFile of sourceFiles) {
  const getType = sourceFile.getInterfaces()[0].getType()
  getType.getProperties().forEach((symbol) => {
    const declarations = symbol.getDeclarations()
    const decl = declarations[0]

    // OK
    console.log({
      name: symbol.getName(),
      type: symbol.getTypeAtLocation(decl).getText(),
      optional: decl?.getKindName() === 'PropertySignature' ? decl.hasQuestionToken?.() : false,
    })
  })
}
