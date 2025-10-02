import db from "../../../db/db.json" assert { type: "json" }

let burgers = [...db.burgers]

export async function onRequestGet() {
  return new Response(JSON.stringify(burgers), {
    headers: { "Content-Type": "application/json" }
  })
}

export async function onRequestPost({ request }) {
  const body = await request.json()
  const novo = { id: crypto.randomUUID().slice(0, 4), ...body }
  burgers.push(novo)
  return new Response(JSON.stringify(novo), {
    headers: { "Content-Type": "application/json" }
  })
}
