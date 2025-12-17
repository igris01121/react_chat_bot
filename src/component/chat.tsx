import react from "react";
import { useEffect, useState } from "react";

export function Chat() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div
        className="w-full max-w-xl h-[70vh] flex flex-col rounded-3xl 
                  bg-slate-950/70 backdrop-blur 
                  border border-slate-800 
                  shadow-2xl"
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-slate-800
                    text-slate-100 font-semibold tracking-wide"
        >
          Live Chat
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <div
            className="max-w-[80%] px-4 py-2 rounded-2xl
                      text-sm text-white
                      bg-gradient-to-r from-indigo-600 to-violet-600
                      shadow-md"
          >
            Hello 👋
          </div>

          <div
            className="max-w-[80%] px-4 py-2 rounded-2xl
                      text-sm text-white
                      bg-gradient-to-r from-indigo-600 to-violet-600
                      shadow-md"
          >
            This is a Tailwind chat box
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-800 flex gap-3">
          <input
            placeholder="Type your message…"
            className="flex-1 rounded-xl bg-slate-900 text-slate-100
                   px-4 py-2 text-sm
                   border border-slate-700 outline-none
                   focus:border-indigo-500
                   focus:ring-2 focus:ring-indigo-500/40"
          />
          <button
            className="px-5 py-2 rounded-xl
                   bg-indigo-600 hover:bg-indigo-500
                   active:scale-95 transition
                   text-sm font-medium text-white shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
