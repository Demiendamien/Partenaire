import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const token = await getToken({ req })
  if (!token?.email) return NextResponse.json([], { status: 401 })

  const sections = await prisma.section.findMany({
    where: { user: { email: token.email } },
    include: { tasks: true },
  })

  return NextResponse.json(sections)
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req })
  if (!token?.email) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const { name } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  })

  if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })

  const section = await prisma.section.create({
    data: { name, userId: user.id },
  })

  return NextResponse.json(section)
}
