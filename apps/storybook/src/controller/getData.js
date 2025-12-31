import db from '../model/db'

export async function getClassification() {
  return await db.prepare(`SELECT id, keywords, categorys, binding FROM components;`).all()
}
export async function getDemo() {
  return await db.prepare(`SELECT demos FROM components;`).all()
}
export async function getContent(category) {
  switch (category) {
    // 還沒寫
  }
}

export async function getConfig() {
  const config = await db.prepare(`SELECT id, keywords, categorys FROM config;`).get()
  return config
}
