import { Check, Pencil, Trash2 } from "lucide-react";

export default function TodoItem({ todo, onToggle, onEdit, onDelete, saving }) {
  const id = todo._id ?? todo.id;
  const title = todo.title ?? todo.tittle;

  return (
    <article className={`group flex gap-4 rounded-2xl border bg-white p-5 shadow-sm transition duration-500 dark:bg-slate-900 ${todo.status ? "border-emerald-100 dark:border-emerald-900" : "border-slate-200 dark:border-slate-800"}`}>
      <button
        onClick={() => onToggle(todo)}
        disabled={saving}
        aria-label={todo.status ? "Mark as incomplete" : "Mark as completed"}
        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${todo.status ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 hover:border-indigo-500 dark:border-slate-600"}`}
      >
        {todo.status && <Check className="h-4 w-4" />}
      </button>
      <div className="min-w-0 flex-1">
        <h3 className={`font-semibold ${todo.status ? "text-slate-400 line-through" : "text-slate-800 dark:text-white"}`}>{title}</h3>
        {todo.description && <p className={`mt-1 text-sm ${todo.status ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>{todo.description}</p>}
      </div>
      <div className="flex h-fit gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        <button onClick={() => onEdit(todo)} aria-label="Edit task" className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-950"><Pencil className="h-4 w-4" /></button>
        <button onClick={() => onDelete(id)} aria-label="Delete task" className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950"><Trash2 className="h-4 w-4" /></button>
      </div>
    </article>
  );
}