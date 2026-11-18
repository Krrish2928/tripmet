import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#1F6B57] shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white rounded-xl shadow-lg border border-[#E8E8E2] p-4 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-center gap-3">
              {icons[toast.type || 'success']}
              <span className="text-sm font-medium text-[#1D2925] leading-snug">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md text-[#707873] hover:text-[#1D2925] hover:bg-[#F3F3EE]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

