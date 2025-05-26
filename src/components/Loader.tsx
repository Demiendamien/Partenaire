import React from 'react';
export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <span className="absolute inset-0 flex items-center justify-center font-semibold text-blue-600 text-sm">
          Connexion ....
        </span>
      </div>
    </div>
  )
}
