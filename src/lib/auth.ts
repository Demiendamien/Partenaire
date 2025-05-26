import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { compare } from "bcrypt"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("Tentative de connexion avec :", credentials)
        // Vérifie si les champs email et password sont remplis
        // Si l'un d'eux est vide, retourne null

        if (!credentials?.email || !credentials?.password) {
          console.log("Email ou mot de passe manquant")
          return null
        }

        // Vérifie si l'utilisateur existe dans la base de données
        // Si l'utilisateur n'existe pas, retourne null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user){
          console.log("Utilisateur non trouvé")
          return null
        }

        const passwordValid = await compare(credentials.password, user.password)
        if (!passwordValid) {
          console.log("Mot de passe incorrect")
          return null
        }

        console.log("Connexion réussie pour :", user.email)

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // ← assure-toi que cette page existe
  },
}
