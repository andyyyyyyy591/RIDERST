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
            {/* Línea vertical + ícono */}
            <div className="flex flex-col items-center flex-shrink-0">
              {/* Círculo */}
              <div className="relative flex items-center justify-center">
                {isCurrent && (
                  <span className="absolute animate-ping inline-flex h-10 w-10 rounded-full bg-orange-400 opacity-20" />
                )}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center z-10 border-2 transition-all
                    ${isDone ? "bg-orange-500 border-orange-500" : ""}
                    ${isCurrent ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-200" : ""}
                    ${isPending ? "bg-white border-gray-200" : ""}
                  `}
                >
                  {isDone && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isCurrent && (
                    <span className="text-base">{stage.icon}</span>
                  )}
                  {isPending && (
                    <span className="text-base opacity-30">{stage.icon}</span>
                  )}
                </div>
              </div>

              {/* Línea conectora */}
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 my-1 rounded-full ${
                    isDone ? "bg-orange-400" : "bg-gray-100"
                  }`}
                  style={{ minHeight: "24px" }}
                />
              )}
            </div>

            {/* Contenido */}
            <div className={`pb-6 pt-1.5 flex-1 ${isLast ? "pb-0" : ""}`}>
              <div className="flex items-center gap-2 mb-0.5">
                <p
                  className={`font-semibold text-sm leading-tight
                    ${isDone ? "text-gray-700" : ""}
                    ${isCurrent ? "text-gray-900" : ""}
                    ${isPending ? "text-gray-300" : ""}
                  `}
                >
                  {stage.label}
                </p>
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    En curso
                  </span>
                )}
                {isDone && (
                  <span className="text-orange-500 text-xs font-medium">✓</span>
                )}
              </div>

              {/* Descripción solo para completados y actual */}
              {(isDone || isCurrent) && (
                <p className={`text-xs leading-relaxed mt-1 ${
                  isDone ? "text-gray-400" : "text-gray-500"
                }`}>
                  {stage.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
