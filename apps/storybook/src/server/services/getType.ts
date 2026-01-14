import path from 'path'
import fs from 'fs'
import { Project, Node } from 'ts-morph'

/**
 * 紀錄: ts-morph只能編譯純文字檔，無法在運行時態解析。
 * 瀏覽器環境，沒有node的fs模組可以取得本地檔案，ts-morph只能另創一個全新的記憶體空間，手動將要解析的ts文字檔複製到記憶體空間中，無法直接在運行中取得ts的interface。
 * 只要做好 server/client 邊界，就可以在 server 讀取 interface
 */

/**
 * addSourceFilesAtPaths取得超出storybook根目錄的檔案，因此只能使用絕對路徑。
 * 先取得 repo root 絕對路徑
 * 往上找 package.json，找到就認定那個資料夾是 repo root
 */
const findRepoRoot = (): string => {
  let dir = process.cwd()

  while (true) {
    const parent = path.dirname(dir)
    if (fs.existsSync(path.join(parent, 'package.json'))) {
      return parent
    }
    if (parent === dir) {
      throw new Error('找不到 repo root (package.json)')
    }
    dir = parent
  }
}

// repoRoot 下的 packages/components/layouts 絕對路徑
const repoRoot = findRepoRoot()
const componentsPath = path.join(repoRoot, 'packages', 'components', '**/*.type.ts')
const layoutsPath = path.join(repoRoot, 'packages', 'layouts', '**/*.type.ts')

export default (() => {
  // 取得interface
  const project = new Project()
  const sourceFiles = project.addSourceFilesAtPaths([componentsPath, layoutsPath])

  const interfaces: Record<string, { props: string; type: string; optional: boolean }[]> = {}
  for (const sourceFile of sourceFiles) {
    const componentName = sourceFile.getFilePath().split('/').at(-2) || ''
    const getType = sourceFile.getInterfaces()[0].getType()

    interfaces[componentName] = getType.getProperties().map((symbol) => {
      const tsNodes = symbol.getDeclarations()
      const tsNode = tsNodes[0]

      return {
        props: symbol.getName(),
        type: symbol.getTypeAtLocation(tsNode).getText(),
        optional: Node.isPropertySignature(tsNode) ? tsNode.hasQuestionToken() : false,
      }
    })
  }

  return interfaces
})()
