import db from "../../../db/db.json" assert { type: "json" }

export async function onRequestGet() {
  return new Response(JSON.stringify(db.ingredientes), {
    headers: { "Content-Type": "application/json" }
  })
}
