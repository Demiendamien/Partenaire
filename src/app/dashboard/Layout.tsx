import React from "react";
import NavBar from "@/components/NavBar"; 
import Sidebar from "./Sidebar"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      < NavBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
