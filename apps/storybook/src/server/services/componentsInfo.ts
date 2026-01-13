import db from '../models/db.js'

// Classification
export async function getClassification(id: string) {
  return await db.prepare(`SELECT * FROM components WHERE id = ?;`).all(id)
}
/**
 * @param {Array<{id: number, keywords: string, categorys: string, binding: string}>} data
 * @returns
 */
export function setClassification(data = []) {
  const insert = db.prepare(`INSERT INTO components (id, keywords, categorys, binding) VALUES (?, ?, ?, ?);`)
  for (const { id, keywords, categorys, binding } of data) {
    insert.run(id, keywords, categorys, binding, (err: any) => {
      if (err) {
        console.error('Classification插入失敗: ', err)
      }
    })
  }
  insert.finalize()
}

// Demo
export async function getDemo(id: string) {
  return await db.prepare(`SELECT name, category, example, contents, styles, description FROM demos WHERE component_id = ?;`).all(id)
}
/**
 * @param {Array<{component_id: number, name: string, category: string, example: string, contents: string, styles: string, description: string}>} data
 * @returns
 */
export function setDemo(datas: Array<{ component_id: number; name: string; category: string; example: string; contents: string; styles: string; description: string }> = []) {
  const insert = db.prepare(`INSERT INTO demos (component_id, name, category, example, contents, styles, description) VALUES (?, ?, ?, ?, ?, ?, ?);`)
  for (const { component_id, name, category, example, contents, styles, description } of datas) {
    insert.run(component_id, name, category, example, contents, styles, description, (err: any) => {
      if (err) {
        console.error('Demo插入失敗: ', err)
      }
    })
  }
  insert.finalize()
}

// Content
export async function getContent(category: string) {
  switch (
    category
    // 還沒寫
  ) {
  }
}

// image_txt
export async function getImageTxt() {}

// Config
export async function getConfig(config: string) {
  return await db.prepare(`SELECT ${config} FROM config;`).get()
}
export function updateConfig(config: string, value: string) {
  db.prepare(`UPDATE config SET ${config} = ?;`).run(value, (err: any) => {
    if (err) {
      console.error('Config更新失敗: ', err)
    }
  })
}

// Interface
export async function getInterface(name: string) {
  return await db.prepare(`SELECT * FROM interface WHERE name = ${name};`).get()
}
export function refreshInterface(datas: Record<string, string> = {}) {
  const refresh = db.prepare(`INSERT INTO interface (id, data) VALUES (?, ?); ON CONFLICT(id) DO UPDATE SET data = EXCLUDED.data;`)
  for (const id in datas) {
    refresh.run([id, datas[id]], (err: any) => {
      if (err) {
        console.error('刷新插入失敗: ', err)
      }
    })
  }
  refresh.finalize()
}
