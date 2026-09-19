import TodoItem from "./todoItem";

export default function TodoList({ todos, loading, ...actions }) {
  if (loading) return <p className="py-12 text-center text-slate-500 dark:text-slate-400">Loading your tasks...</p>;
  if (!todos.length) return <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">No tasks yet. Add your first one above.</div>;

  return <div className="space-y-3">{todos.map((todo) => <TodoItem key={todo._id ?? todo.id} todo={todo} {...actions} />)}</div>;
}