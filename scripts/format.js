import { outDir as od } from '../packages/astro-config/index.mjs'
import fs from 'fs-extra'
import path from 'node:path'
import prettier from 'prettier'

// 取得路徑
const callerCwd = process.env.INIT_CWD
const outDir = path.resolve(callerCwd, od)

async function removeRedundantTags(dir) {
  try {
    // 讀取目錄下所有檔案
    const files = await fs.readdir(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = await fs.stat(filePath)

      if (stat.isDirectory()) {
        // 遞迴處理子資料夾
        await removeRedundantTags(filePath)
      } else if (file.endsWith('.html')) {
        // 讀取 HTML
        let content = await fs.readFile(filePath, 'utf-8')

        // 刪除 <!DOCTYPE html>、<html> 和 <head> 區塊
        content = content.replace(/<!DOCTYPE html>|<html[^>]*>|<\/html>|<head>|<\/head>/g, '')
        // 把 <link ... /> 後面加上換行
        content = content.replace(/<link[^>]*\/?>/gi, (match) => `${match}\n`)
        // 合併相鄰的 <style> 標籤
        content = content.replace(/<\/style[^>]*>\s*<style>/gi, '')

        // Prettier 格式化
        const options = (await prettier.resolveConfig(filePath)) || { parser: 'html' }
        const formatted = await prettier.format(content, {
          ...options,
          parser: 'html',
        })

        // 寫回檔案
        await fs.writeFile(filePath, formatted, 'utf-8')

        console.log(`已格式化: ${filePath}`)
      }
    }
  } catch (err) {
    console.error('格式化時發生錯誤:', err)
  }
}

removeRedundantTags(outDir)
