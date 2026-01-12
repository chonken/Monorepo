import { Project } from 'ts-morph'

// 取得interface
const project = new Project()
const sourceFiles = project.addSourceFilesAtPaths(['packages/components/**/*.type.ts', 'packages/layouts/**/*.type.ts'])
for (const sourceFile of sourceFiles) {
  const getType = sourceFile.getInterfaces()[0].getType()
  getType.getProperties().forEach((symbol) => {
    const declarations = symbol.getDeclarations()
    const decl = declarations[0]

    console.log({
      name: symbol.getName(),
      type: symbol.getTypeAtLocation(decl).getText(),
      optional: decl?.getKindName() === 'PropertySignature' ? decl.hasQuestionToken?.() : false,
    })
  })
}

/**
 * 紀錄: ts-morph只能編譯純文字檔，無法在運行時態解析。
 * 因為開啟storybook後，是瀏覽器環境，沒有node的fs模組可以取得本地檔案，所以只能另創一個全新的記憶體空間，只能手動將要解析的ts文字檔複製到記憶體空間中，因此無法直接在運行中取得ts的interface。只能先行在cmd時塞入腳本更新後運行讀取
 */