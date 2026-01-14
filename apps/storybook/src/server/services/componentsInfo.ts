import db from '../models/db.js'

// Classification
export function getClassification(id: string) {
  return db.prepare(`SELECT * FROM components WHERE id = ?;`).all(id)
}
export function setClassification(data = []) {
  const insert = db.prepare(`INSERT INTO components (id, keywords, categorys, binding) VALUES (?, ?, ?, ?);`)
  for (const { id, keywords, categorys, binding } of data) {
    insert.run(id, keywords, categorys, binding)
  }
}

// Demo
export async function getDemo(id: string) {
  return await db.prepare(`SELECT name, category, example, contents, styles, description FROM demos WHERE component_id = ?;`).all(id)
}
export function setDemo(datas: Array<{ component_id: number; name: string; category: string; example: string; contents: string; styles: string; description: string }> = []) {
  const insert = db.prepare(`INSERT INTO demos (component_id, name, category, example, contents, styles, description) VALUES (?, ?, ?, ?, ?, ?, ?);`)
  for (const { component_id, name, category, example, contents, styles, description } of datas) {
    insert.run(component_id, name, category, example, contents, styles, description)
  }
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
