import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const task = await prisma.task.delete({
    where: { id: params.id },
  })

  return NextResponse.json(task)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const body = await req.json()

  try {
    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...(body.status !== undefined && {
          status: body.status,
          completedAt: body.status ? new Date() : null,
        }),
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.sectionId && { sectionId: body.sectionId }),
      },
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error)
    return NextResponse.json({ error: "Erreur de la mise à jour" }, { status: 500 })
  }
}

