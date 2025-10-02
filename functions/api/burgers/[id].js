import db from "../../../db/db.json" assert { type: "json" }

// In-memory copy dos burgers (igual ao json-server)
let burgers = [...db.burgers]

export async function onRequestGet({ params }) {
  const { id } = params
  if (!id) {
    return new Response(JSON.stringify({ error: "ID não fornecido" }), { status: 400 })
  }

  const burger = burgers.find(b => b.id === id)
  if (!burger) {
    return new Response(JSON.stringify({ error: "Pedido não encontrado" }), { status: 404 })
  }

  return new Response(JSON.stringify(burger), {
    headers: { "Content-Type": "application/json" }
  })
}

export async function onRequestPatch({ request, params }) {
  const { id } = params
  if (!id) {
    return new Response(JSON.stringify({ error: "ID não fornecido" }), { status: 400 })
  }

  const burger = burgers.find(b => b.id === id)
  if (!burger) {
    return new Response(JSON.stringify({ error: "Pedido não encontrado" }), { status: 404 })
  }

  const body = await request.json()
  Object.assign(burger, body)

  return new Response(JSON.stringify(burger), {
    headers: { "Content-Type": "application/json" }
  })
}

export async function onRequestDelete({ params }) {
  const { id } = params
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
