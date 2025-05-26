'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

type Section = {
  id: string
  name: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onTaskAdded: () => void
}

export default function AddTaskModal({ isOpen, onClose, onTaskAdded }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sectionId, setSectionId] = useState('')
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    if (isOpen) {
      fetch('/api/sections')
        .then(res => res.json())
        .then(data => setSections(data))
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, sectionId }),
    })

    if (res.ok) {
      setTitle('')
      setDescription('')
      setSectionId('')
      toast.success('Tâche ajoutée avec succès 🎉')
      onClose()
      onTaskAdded()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose} // fermer modal si clic en dehors
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-6 shadow-lg relative"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()} // empêcher la fermeture au clic dans le modal
          >
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
              <X />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">➕ Nouvelle tâche</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Titre"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <select
                value={sectionId}
                onChange={e => setSectionId(e.target.value)}
                required
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              >
                <option value="">Choisir une section</option>
                {sections.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Ajouter
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
