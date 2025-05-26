'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Task = {
  id: string
  title: string
  description: string
  status: boolean
  createdAt: string
  completedAt: string | null
}

type Section = {
  id: string
  name: string
  tasks?: Task[]
}

type Props = {
  isOpen: boolean
  task: Task | null
  sections: Section[]
  onClose: () => void
  onTaskUpdated: () => void
}

export default function EditTaskModal({
  isOpen,
  task,
  sections,
  onClose,
  onTaskUpdated
}: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sectionId, setSectionId] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      const currentSection = sections.find(section => section.tasks?.some(t => t.id === task.id))
      setSectionId(currentSection?.id || '')
    }
  }, [task, sections])

  const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!task?.id) {
    toast.error("ID de la tâche manquant");
    return;
  }

  const res = await fetch(`/api/tasks/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      sectionId,
    }),
  });

  if (res.ok) {
    toast.success("Tâche mise à jour !");
    onTaskUpdated();
    onClose();
  } else {
    toast.error("Échec de la mise à jour de la tâche 😢");
  }
};


  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          ✏️ Modifier la tâche
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Choisir une section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:underline"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}