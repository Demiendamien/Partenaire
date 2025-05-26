import { NextResponse,  } from "next/server"
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET : récupère les tâches de l'utilisateur connecté
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json([], { status: 401 })

  const tasks = await prisma.task.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(tasks)
}

// POST : crée une nouvelle tâche
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const { title, description, sectionId } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status: false,
      userId: user.id,
      sectionId,
    },
  })

  return NextResponse.json(task, { status: 201 })
}

// DELETE : supprime une tâche
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const task = await prisma.task.delete({
    where: { id: params.id }, 
  })

  return NextResponse.json(task)
}

// PATCH : modifie une tâche
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { title, description, sectionId } = req.body;

    try {
      const updatedTask = await prisma.task.update({
        where: { id: id as string },
        data: {
          title,
          description,
          sectionId,
        },
      });

      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      return res.status(500).json({ error: 'Erreur de la mise à jour de la tâche.' });
    }
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
