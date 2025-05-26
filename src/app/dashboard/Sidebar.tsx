"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ListTodo,
  FolderKanban,
  Settings,
  PlusCircle,
  SquareCheckBig,
} from "lucide-react";
import AddTaskModal from "@/components/AddTaskModal";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react"; 

const navItems = [
  { label: "Accueil", href: "/", icon: <Home size={20} /> },
  { label: "Tâches", href: "/dashboard", icon: <ListTodo size={20} /> },
  { label: "Tâches accomplis", href: "/done", icon: <SquareCheckBig size={20} /> },
  { label: "Projets", href: "/projects", icon: <FolderKanban size={20} /> },
  { label: "Paramètres", href: "/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`h-screen bg-black text-white transition-all duration-200 ${
          expanded ? "w-48" : "w-16"
        } fixed top-0 left-0 z-50 flex flex-col justify-between py-6 px-2`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="space-y-4">
          <h1 className="text-center text-lg font-bold text-white mb-6">
            {expanded ? "TaskMaster" : "TM"}
          </h1>

          <div className="px-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-sm hover:text-blue-400"
            >
              <PlusCircle size={18} />
              {expanded && <span>Nouvelle tâche</span>}
            </button>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition ${
                pathname === item.href ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              {expanded && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        <div className="px-3">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-sm hover:text-white  transition hover:bg-red-800 rounded px-3 py-2"
          >
            <LogOut size={18} />
            {expanded && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={() => location.reload()} // ou appelle une fonction pour refetch
      />
    </>
  );
}
