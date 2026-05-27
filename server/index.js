import express from "express"
import cors from "cors"
import prisma from "./prisma.js"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }))
app.use(express.json())

const ADMIN_ADDRESS = "0x87bEafC2bEf36b4afA32dcaF6E6A9F272Be1dff5"

app.get("/api/wallet/:address", async (req, res) => {
  try {
    const address = req.params.address.toLowerCase()
    let wallet = await prisma.wallet.findUnique({ where: { address } })
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { address, role: address === ADMIN_ADDRESS.toLowerCase() ? "Admin" : "Free" },
      })
    }
    res.json({ address: wallet.address, role: wallet.role })
  } catch (err) {
    console.error("GET /api/wallet/:address", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/wallet", async (req, res) => {
  try {
    const { address, role } = req.body
    if (!address) return res.status(400).json({ error: "Address is required" })
    const addr = address.toLowerCase()
    const wallet = await prisma.wallet.upsert({
      where: { address: addr },
      update: { role: role || undefined },
      create: { address: addr, role: addr === ADMIN_ADDRESS.toLowerCase() ? "Admin" : (role || "Free") },
    })
    res.json({ address: wallet.address, role: wallet.role })
  } catch (err) {
    console.error("POST /api/wallet", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
