import db from "../../../db/db.json" assert { type: "json" }

export async function onRequestGet() {
  return new Response(JSON.stringify(db.status), {
    headers: { "Content-Type": "application/json" }
  })
}
