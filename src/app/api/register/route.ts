import { hash } from 'bcrypt'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 })

  const hashedPassword = await hash(password, 10)
  await prisma.user.create({ data: { email, password: hashedPassword } })

  return NextResponse.json({ success: true })
}