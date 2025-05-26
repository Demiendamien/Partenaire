import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center max-w-6xl mx-auto mb-12">
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        TaskMaster
      </div>
      <div className="space-x-4 text-sm">
        <Link
          href="/"
          className="hover:underline text-gray-700 dark:text-gray-200"
        >
          Accueil
        </Link>
        <Link
          href="/dashboard"
          className="hover:underline text-gray-700 dark:text-gray-200"
        >
          Tâches
        </Link>
        <Link
          href="/settings"
          className="hover:underline text-gray-700 dark:text-gray-200"
        >
          Paramètres
        </Link>
      </div>
    </nav>
  );
}
