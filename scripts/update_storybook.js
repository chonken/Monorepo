import { Project } from 'ts-morph'
import fs from 'fs-extra'
import path from 'path'

// 取得interface
const project = new Project()
const sourceFiles = project.addSourceFilesAtPaths(['packages/components/**/*.type.ts', 'packages/layouts/**/*.type.ts'])
const interfaces = {}
for (const sourceFile of sourceFiles) {
  const componentName = sourceFile.getFilePath().split('/').at(-2)
  const getType = sourceFile.getInterfaces()[0].getType()

  interfaces[componentName] = getType.getProperties().map((symbol) => {
    const declarations = symbol.getDeclarations()
    const decl = declarations[0]

    return {
      props: symbol.getName(),
      type: symbol.getTypeAtLocation(decl).getText(),
      optional: decl?.getKindName() === 'PropertySignature' ? decl.hasQuestionToken?.() : false,
    }
  })
}

const outputDir = path.resolve('apps/storybook/src/shared/registry')
fs.ensureDirSync(outputDir)

const outputFile = path.join(outputDir, 'getInterface.js')
const fakeJs = `// 腳本自動刷新 \nexport default ${JSON.stringify(interfaces)}`
fs.writeFileSync(outputFile, fakeJs, 'utf-8')

/**
 * 紀錄: ts-morph只能編譯純文字檔，無法在運行時態解析。
 * 因為開啟storybook後，是瀏覽器環境，沒有node的fs模組可以取得本地檔案，所以只能另創一個全新的記憶體空間，只能手動將要解析的ts文字檔複製到記憶體空間中，無法直接在運行中取得ts的interface。且addSourceFilesAtPaths無法使用alias，路徑將會非常醜。
 * 無法在此控制storybook內的資料庫，因此用js匯出的方式讓前端取得資料。
 * 只好先行在cmd時塞入腳本更新後運行讀取
 */
