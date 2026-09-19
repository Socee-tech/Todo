import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Snackbar({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;
  const isError = type === "error";

  return (
    <div role="alert" className={`fixed bottom-5 right-5 z-30 flex max-w-sm items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${isError ? "border-rose-200 bg-rose-50 text-rose-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
      {isError ? <AlertCircle className="h-5 w-5 shrink-0" /> : <CheckCircle2 className="h-5 w-5 shrink-0" />}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} aria-label="Close notification" className="ml-auto rounded p-1 hover:bg-black/5"><X className="h-4 w-4" /></button>
    </div>
  );
}