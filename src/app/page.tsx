import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Bienvenue sur <span className="text-blue-600 dark:text-blue-400">TaskMaster</span> – Votre Gestionnaire de Tâches Simplifié
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          💡 Organisez vos journées, boostez votre productivité.
        </p>
      </header>

      <section className="max-w-3xl mx-auto grid gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Pourquoi choisir TaskMaster ?</h2>
          <ul className="space-y-2">
            <li>
              ✅ <strong>Facile à utiliser</strong> – Ajoutez, modifiez et supprimez vos tâches en un clic.
            </li>
            <li>
              ✅ <strong>Synchronisation automatique</strong> – Accédez à votre liste depuis n’importe quel appareil.
            </li>
            <li>
              ✅ <strong>Rappels intelligents</strong> – Ne manquez jamais une échéance importante.
            </li>
          </ul>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition-all duration-200">
            Créer un compte
          </Link>
          <Link href="/login" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-xl text-lg font-medium transition-all duration-200">
            Se connecter
          </Link>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">🖊️ Exemple de liste de tâches</h3>
          <ul className="space-y-2">
            <li className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded shadow">
              ✅ Terminer le rapport mensuel
            </li>
            <li className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded shadow">
              📕 Prendre rendez-vous chez le dentiste
            </li>
            <li className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded shadow">
              🌐 Lire les actus tech 15 min
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
