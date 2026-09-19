import { useCallback, useEffect, useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import API, { todoApi } from "./api/todos";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import EditTodoModal from "./components/editTodo";
import Snackbar from "./components/Snackbar";
import ThemeToggle from "./components/ThemeToggle";


export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [snackbar, setSnackbar] = useState({ message: "", type: "success" });
  const [dark, setDark] = useState(() => localStorage.theme === "dark" || (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches));


  const showSnackbar = useCallback((message, type = "success") => setSnackbar({ message, type }), []);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await API.get();
      setTodos(data.data ?? []);
    } catch (err) { showSnackbar(err.message, "error"); }
    finally { setLoading(false); }
  }, [showSnackbar]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadTodos(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadTodos]);

  const completed = useMemo(() => todos.filter((todo) => todo.status).length, [todos]);

  async function run(action, successMessage) {
    setSaving(true);
    try { await action(); await loadTodos(); showSnackbar(successMessage); }
    catch (err) { showSnackbar(err.message, "error"); }
    finally { setSaving(false); }
  }

  const idOf = (todo) => todo._id ?? todo.id;
  const addTodo = (todo) => run(() => todoApi.create(todo), "Task added successfully.");
  const saveTodo = (todo) => run(async () => { await todoApi.update(idOf(todo), todo); setEditing(null); }, "Task updated successfully.");
  const toggleTodo = (todo) => run(() => todoApi.update(idOf(todo), { ...todo, title: todo.title ?? todo.tittle, status: !todo.status }), todo.status ? "Task marked as incomplete." : "Task completed!");
  const deleteTodo = (id) => { if (window.confirm("Delete this task?")) run(() => todoApi.remove(id), "Task deleted successfully."); };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 transition-colors duration-500 dark:bg-slate-950 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200"><ClipboardList /></div>
          <div><h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">My tasks</h1><p className="text-sm text-slate-500 dark:text-slate-400">{completed} of {todos.length} completed</p></div>
          <ThemeToggle dark={dark} onToggle={() => setDark((value) => !value)} />
        </header>
        <div className="mb-6"><TodoForm onAdd={addTodo} saving={saving} /></div>
        <TodoList todos={todos} loading={loading} saving={saving} onToggle={toggleTodo} onEdit={setEditing} onDelete={deleteTodo} />
      </div>
      <EditTodoModal todo={editing} onClose={() => setEditing(null)} onSave={saveTodo} saving={saving} />
      <Snackbar {...snackbar} onClose={() => setSnackbar({ message: "", type: "success" })} />
    </main>
  );
}