import data from "../../db/db.json" assert { type: "json" }

export async function onRequestGet() {
  return new Response(JSON.stringify(data.ingredientes), {
    headers: { "Content-Type": "application/json" }
  })
}
