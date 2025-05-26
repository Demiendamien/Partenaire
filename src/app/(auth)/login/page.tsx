'use client'

import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from '@/components/Loader'
import { set } from 'date-fns'

const carouselImages = [
  { src: '/images/loginImages/organisation.jpg', title: 'Organisez vos tâches' },
  { src: '/images/loginImages/gérez_votre_temps_2.jpg', title: 'Gérez votre temps' },
  { src: '/images/loginImages/Objectif.jpg', title: 'Atteignez vos objectifs' },
]

function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-[600px] h-[400px] rounded-lg overflow-hidden shadow-xl">
      <AnimatePresence>
        <motion.img
          key={carouselImages[index].src}
          src={carouselImages[index].src}
          alt={carouselImages[index].title}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>
      <motion.div
        key={carouselImages[index].title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-2 rounded text-lg font-semibold text-gray-700 shadow"
      >
        {carouselImages[index].title}
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      email: email.trim().toLocaleLowerCase(),
      password,
      redirect: false,
    })

    if (res?.ok) {
      router.push("/dashboard")
    } else {
      alert("Connexion échouée")
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 gap-16 p-8">
      {loading && <Loader />}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Connexion</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='Email'
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Mot de passe' 
            />
          </div>
          <button 
            type="submit"
            className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Pas encore de compte? 
          <a href="/register" className="text-blue-500 hover:underline"> S'inscrire</a>
        </p>
      </motion.div>
      <Carousel />
    </div>
  );
}
