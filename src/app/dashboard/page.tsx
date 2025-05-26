import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="text-center mt-10 text-red-500">
        🚫 Vous devez être connecté pour accéder au tableau de bord.
      </div>
    )
  }

  return <DashboardClient />
}
