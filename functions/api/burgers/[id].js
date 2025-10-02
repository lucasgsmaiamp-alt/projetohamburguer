import db from "../../../db/db.json" assert { type: "json" }

let burgers = [...db.burgers]

export async function onRequestGet({ params }) {
  const burger = burgers.find(b => b.id === params.id)
  if (!burger) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  return new Response(JSON.stringify(burger), { headers: { "Content-Type": "application/json" } })
}

export async function onRequestPatch({ request, params }) {
  const body = await request.json()
  const burger = burgers.find(b => b.id === params.id)
  if (!burger) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  Object.assign(burger, body)
  return new Response(JSON.stringify(burger), { headers: { "Content-Type": "application/json" } })
}

export async function onRequestDelete({ params }) {
  const { id } = params // pega o id corretamente
  if (!id) {
    return new Response(JSON.stringify({ error: "ID não fornecido" }), { status: 400 })
  }

  const index = burgers.findIndex(b => b.id === id)
  if (index === -1) {
    return new Response(JSON.stringify({ error: "Pedido não encontrado" }), { status: 404 })
  }

  const deleted = burgers.splice(index, 1)[0]

  return new Response(JSON.stringify(deleted), {
    headers: { "Content-Type": "application/json" }
  })
}
