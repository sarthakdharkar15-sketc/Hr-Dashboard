import React from "react";
import { useHR } from "../../context/HRContext";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useHR();

  if (!toasts.length) return null;

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
      case "error":
        return <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-violet-400 shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-emerald-500/30 bg-[#0e1e24]/90 text-emerald-100";
      case "warning":
        return "border-amber-500/30 bg-[#1e1910]/90 text-amber-100";
      case "error":
        return "border-rose-500/30 bg-[#240e14]/90 text-rose-100";
      case "info":
      default:
        return "border-violet-500/30 bg-[#15122b]/90 text-violet-100";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 ${getBorderColor(
            toast.type
          )}`}
        >
          {getIcon(toast.type)}
          <div className="flex-1 min-w-0 pr-1">
            <h4 className="text-xs font-semibold tracking-wide text-white">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
