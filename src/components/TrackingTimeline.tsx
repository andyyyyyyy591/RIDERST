"use client";

import { PUBLIC_STAGES } from "@/config/stages";

interface Props {
  stages: typeof PUBLIC_STAGES;
  currentStage: number;
}

export default function TrackingTimeline({ stages, currentStage }: Props) {
  return (
    <ol className="space-y-0">
      {stages.map((stage, index) => {
        const isDone = stage.id < currentStage;
        const isCurrent = stage.id === currentStage;
        const isPending = stage.id > currentStage;
        const isLast = index === stages.length - 1;

        return (
          <li key={stage.id} className="flex gap-4">
            {/* Columna izquierda: icono + línea vertical */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-colors
                  ${isDone ? "bg-orange-500 border-orange-500" : ""}
                  ${isCurrent ? "bg-orange-500 border-orange-500 ring-4 ring-orange-500/30" : ""}
                  ${isPending ? "bg-slate-800 border-slate-600" : ""}
                `}
              >
                {isDone && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isCurrent && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
                {isPending && (
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                )}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 my-1 ${
                    isDone ? "bg-orange-500" : "bg-slate-700"
                  }`}
                  style={{ minHeight: "20px" }}
                />
              )}
            </div>

            {/* Columna derecha: texto */}
            <div className={`pb-5 pt-0.5 ${isLast ? "pb-0" : ""}`}>
              <p
                className={`font-medium text-sm leading-tight
                  ${isDone || isCurrent ? "text-white" : "text-slate-500"}
                `}
              >
                {stage.label}
              </p>
              {isCurrent && (
                <p className="text-orange-400 text-xs mt-0.5">En curso</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
