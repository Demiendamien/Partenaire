import { CheckCircle2 } from "lucide-react";

export default function TaskCard({ task }: { task: any }) {
  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{task.title}</h2>
        <CheckCircle2 className="text-green-600" />
      </div>
      <p className="text-gray-600 text-sm mt-2">{task.description}</p>
    </div>
  );
}
