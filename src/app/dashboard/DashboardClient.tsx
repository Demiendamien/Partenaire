'use client';

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import EditTaskModal from "@/components/EditTaskModal";
import toast from "react-hot-toast";

// Types

type Task = {
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
  completedAt: string | null;
};

type Section = {
  id: string;
  name: string;
  tasks: Task[];
};

export default function DashboardClient() {
  const [sections, setSections] = useState<Section[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetSection, setTargetSection] = useState<string>("");
  const [newSectionName, setNewSectionName] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const fetchSections = async () => {
    const res = await fetch("/api/sections");
    const data = await res.json();
    setSections(data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        sectionId: targetSection,
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setTargetSection("");
      fetchSections();
    }
  };

  const toggleComplete = async (taskId: string, status: boolean) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: !status }),
    });
    fetchSections();
  };

  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchSections();
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
    toast("Tâche à modifier : " + task.title);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="md:ml-48 flex-1 p-6 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          📋 Mes Sections
        </h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const res = await fetch("/api/sections", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: newSectionName }),
            });

            if (res.ok) {
              setNewSectionName("");
              fetchSections();
            }
          }}
          className="mb-10 space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white uppercase mb-2">
            Créer des sections pour organiser vos tâches
          </h2>
          <input
            type="text"
            placeholder="Nom de la section"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ajouter la section
          </button>
        </form>

        <form onSubmit={handleAddTask} className="space-y-4 mb-10">
          <input
            type="text"
            placeholder="Titre de la tâche"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <select
            value={targetSection}
            onChange={(e) => setTargetSection(e.target.value)}
            required
            className="w-full p-2 border rounded text-sm"
          >
            <option value="">Choisir une section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter la tâche
          </button>
        </form>

        {sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
              {section.name} 📁
              <span className="text-sm text-gray-500"> ({section.tasks.length})</span>
            </h2>
            <ul className="space-y-3">
              {section.tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-start p-4 border rounded shadow-sm bg-white dark:bg-gray-900"
                >
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        task.status ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => toggleComplete(task.id, task.status)}
                      className="text-green-600 hover:underline"
                    >
                      {task.status ? "❌" : "✅"}
                    </button>
                    <button
                      onClick={() => openEditModal(task)}
                      className="text-yellow-500 hover:underline"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:underline"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <EditTaskModal
          isOpen={isEditModalOpen}
          task={taskToEdit}
          sections={sections}
          onClose={() => setIsEditModalOpen(false)}
          onTaskUpdated={fetchSections}
        />
      </main>
    </div>
  );
}
