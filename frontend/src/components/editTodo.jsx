import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EditTodoModal({ todo, onClose, onSave, saving }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!todo) return;
    setTitle(todo.title ?? todo.tittle ?? "");
    setDescription(todo.description ?? "");
  }, [todo]);

  if (!todo) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    if (!title) return;
    await onSave({ ...todo, title, description });
  }

  return (
    <div className="fixed inset-0 z-20 grid place-items-center bg-slate-950/60 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 transition-colors duration-500 dark:text-white">Edit task</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"><X /></button>
        </div>
        <div className="space-y-4">
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-950" />
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-950" />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
            <button disabled={saving} className="rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-50">{saving ? "Saving..." : "Save changes"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}