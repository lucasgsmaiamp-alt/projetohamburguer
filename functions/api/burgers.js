import data from "../../db/db.json" assert { type: "json" }

let burgers = [...data.burgers]

// GET /api/burgers
export async function onRequestGet() {
  return new Response(JSON.stringify(burgers), {
    headers: { "Content-Type": "application/json" }
  })
}

// POST /api/burgers
export async function onRequestPost({ request }) {
  const body = await request.json()
  const novo = { id: crypto.randomUUID().slice(0,4), ...body }
  burgers.push(novo)
  return new Response(JSON.stringify(novo), {
    headers: { "Content-Type": "application/json" }
  })
}

// DELETE /api/burgers/:id
export async function onRequestDelete(context) {
  const url = new URL(context.request.url)
  const id = url.pathname.split("/").pop()
  const index = burgers.findIndex(b => b.id === id)
  if (index === -1) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  }
  const deleted = burgers.splice(index, 1)[0]
  return new Response(JSON.stringify(deleted), {
    headers: { "Content-Type": "application/json" }
  })
}

// PATCH /api/burgers/:id
export async function onRequestPatch(context) {
  const url = new URL(context.request.url)
  const id = url.pathname.split("/").pop()
  const body = await context.request.json()
  const burger = burgers.find(b => b.id === id)
  if (!burger) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  }
  Object.assign(burger, body)
  return new Response(JSON.stringify(burger), {
    headers: { "Content-Type": "application/json" }
  })
}
