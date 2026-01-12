import db from '../model/db'

// Classification
export async function getClassification(id) {
  return await db.prepare(`SELECT * FROM components WHERE id = ?;`).all(id)
}
/**
 * @param {Array<{id: number, keywords: string, categorys: string, binding: string}>} data
 * @returns
 */
export function setClassification(data = []) {
  const insert = db.prepare(`INSERT INTO components (id, keywords, categorys, binding) VALUES (?, ?, ?, ?);`)
  for (const { id, keywords, categorys, binding } of data) {
    insert.run(id, keywords, categorys, binding, (err) => {
      if (err) {
        console.error('Classification插入失敗: ', err)
      }
    })
  }
  insert.finalize()
}

// Demo
export async function getDemo(id) {
  return await db.prepare(`SELECT name, category, example, contents, styles, description FROM demos WHERE component_id = ?;`).all(id)
}
/**
 * @param {Array<{component_id: number, name: string, category: string, example: string, contents: string, styles: string, description: string}>} data
 * @returns
 */
export async function setDemo(data = []) {
  const insert = db.prepare(`INSERT INTO demos (component_id, name, category, example, contents, styles, description) VALUES (?, ?, ?, ?, ?, ?, ?);`)
  for (const { component_id, name, category, example, contents, styles, description } of data) {
    insert.run(component_id, name, category, example, contents, styles, description, (err) => {
      if (err) {
        console.error('Demo插入失敗: ', err)
      }
    })
  }
  insert.finalize()
}

// Content
export async function getContent(category) {
  switch (
    category
    // 還沒寫
  ) {
  }
}

// image_txt
export async function getImageTxt() {}

// Config
export async function getConfig(config) {
  const config = await db.prepare(`SELECT ${config} FROM config;`).get()
  return config
}
export function updateConfig(config, value) {
  db.prepare(`UPDATE config ${config} VALUES (?);`).run(value, (err) => {
    if (err) {
      console.error('Config更新失敗: ', err)
    }
  })
}
