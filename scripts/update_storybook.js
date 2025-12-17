import { Project, SyntaxKind } from 'ts-morph'
import * as path from 'path'
import { readdirSync } from 'fs'
import { join } from 'path'

const project = new Project()
const sourceFiles = project.addSourceFilesAtPaths(['packages/components/**/*.type.ts', 'packages/layouts/**/*.type.ts'])
const result = {}
for (const sourceFile of sourceFiles) {
  const file = sourceFile.getFilePath()
  const dir = path.basename(path.dirname(file))
  const base = path.basename(file).replace('.type.ts', '')
  const name = base === 'index' ? dir : `${dir}/${base}`

  // 取得interface
  const obj = {}
  for (const iface of sourceFile.getInterfaces()) {
    obj.interface = []

    for (const symbol of iface.getType().getProperties()) {
      const decl = symbol.getDeclarations()[0]

      obj.interface.push({
        name: symbol.getName(),
        type: symbol.getTypeAtLocation(decl).getText(),
        optional: decl?.getKindName() === 'PropertySignature' ? decl.hasQuestionToken?.() : false,
      })
    }
  }

  // 取得物件
  for (const stmt of sourceFile.getVariableStatements()) {
    for (const decl of stmt.getDeclarations()) {
      if (!decl.isExported()) continue

      const initializer = decl.getInitializer()
      if (!initializer) continue

      switch (initializer.getKind()) {
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
          obj[decl.getName()] = initializer.getText()
          break
        case SyntaxKind.ArrayLiteralExpression:
          obj[decl.getName()] = initializer
            .asKindOrThrow(SyntaxKind.ArrayLiteralExpression)
            .getElements()
            .map((el) => el.getText())
          break
        case SyntaxKind.ObjectLiteralExpression:
          obj[decl.getName()] = initializer
            .asKindOrThrow(SyntaxKind.ObjectLiteralExpression)
            .getProperties()
            .map((prop) => {
              if (prop.getKind() === SyntaxKind.PropertyAssignment) {
                return { key: prop.getName(), value: prop.getInitializer()?.getText() }
              }
              return null
            })
            .filter(Boolean)
          break
      }
    }
  }

  result[name] = obj
}

console.log(JSON.stringify(result, null, 2))
