"use client";

import { TIMELINE_PHASES } from "@/config/stages";

interface Props {
  phases: typeof TIMELINE_PHASES;
  activePhaseIndex: number; // índice 0-based de la fase activa
}

export default function TrackingTimeline({ phases, activePhaseIndex }: Props) {
  return (
    <ol className="space-y-0">
      {phases.map((phase, index) => {
        const isDone = index < activePhaseIndex;
        const isCurrent = index === activePhaseIndex;
        const isPending = index > activePhaseIndex;
        const isLast = index === phases.length - 1;

        return (
          <li key={phase.key} className="flex gap-4">
            {/* Círculo + línea */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="relative flex items-center justify-center">
                {isCurrent && (
                  <span className="absolute animate-ping inline-flex h-9 w-9 rounded-full bg-orange-400 opacity-20" />
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-all
                  ${isDone    ? "bg-orange-500 border-orange-500" : ""}
                  ${isCurrent ? "bg-orange-500 border-orange-500 shadow-md shadow-orange-100" : ""}
                  ${isPending ? "bg-white border-gray-200" : ""}
                `}>
                  {isDone && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  {isPending  && <div className="w-2 h-2 rounded-full bg-gray-200" />}
                </div>
              </div>

              {!isLast && (
                <div
                  className={`w-0.5 flex-1 my-1 rounded-full ${isDone ? "bg-orange-300" : "bg-gray-100"}`}
                  style={{ minHeight: "20px" }}
                />
              )}
            </div>

            {/* Texto */}
            <div className={`pb-5 pt-1 flex-1 ${isLast ? "pb-0" : ""}`}>
              <div className="flex items-center gap-2">
                <p className={`font-semibold text-sm
                  ${isDone    ? "text-gray-600" : ""}
                  ${isCurrent ? "text-gray-900" : ""}
                  ${isPending ? "text-gray-300" : ""}
                `}>
                  {phase.label}
                </p>
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    En curso
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
