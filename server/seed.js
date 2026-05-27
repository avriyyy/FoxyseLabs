import prisma from "./prisma.js"

const ADMIN_ADDRESS = "0x87bEafC2bEf36b4afA32dcaF6E6A9F272Be1dff5"

async function seed() {
  await prisma.wallet.upsert({
    where: { address: ADMIN_ADDRESS.toLowerCase() },
    update: { role: "Admin" },
    create: { address: ADMIN_ADDRESS.toLowerCase(), role: "Admin" },
  })
  console.log("Admin wallet seeded")
  await prisma.$disconnect()
}

seed()
