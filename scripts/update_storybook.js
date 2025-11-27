import { Project } from 'ts-morph'
const project = new Project()
const sourceFiles = project.addSourceFilesAtPaths(['packages/components/**/*.type.ts', 'packages/layouts/**/*.type.ts'])

for (const sourceFile of sourceFiles) {
  // 取得interface
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
