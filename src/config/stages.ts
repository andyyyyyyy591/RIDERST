// ============================================================
// ARCHIVO CENTRAL DE CONFIGURACIÓN — EDITAR AQUÍ
// Todos los tiempos, etapas y pasos internos del sistema
// ============================================================

export type ProductType = "motorcycle" | "solar_kit" | "electric_tricycle";

// ----- ETAPAS PÚBLICAS (lo que ve el cliente) ---------------
// Modificar textos acá para cambiar lo que aparece en el tracking
export const PUBLIC_STAGES = [
  {
    id: 1,
    label: "Pedido confirmado",
    description: "Tu pedido fue registrado en nuestro sistema y se generó tu número de seguimiento único.",
    icon: "📋",
  },
  {
    id: 2,
    label: "Pago verificado",
    description: "El pago fue recibido y aprobado. Tu envío está autorizado para comenzar el proceso.",
    icon: "✅",
  },
  {
    id: 3,
    label: "Preparando tu envío",
    description: "Tu producto está siendo inspeccionado, preparado y embalado para el transporte internacional.",
    icon: "📦",
  },
  {
    id: 4,
    label: "En trámites de exportación",
    description: "La mercancía ingresó al puerto de Miami y está completando los trámites aduaneros de exportación hacia Cuba.",
    icon: "🏛️",
  },
  {
    id: 5,
    label: "En tránsito marítimo",
    description: "Tu envío está navegando hacia Cuba a bordo de un buque de carga internacional.",
    icon: "🚢",
  },
  {
    id: 6,
    label: "Llegó a Cuba — en aduana",
    description: "La mercancía arribó al puerto cubano y está siendo procesada por la Aduana de Cuba.",
    icon: "🇨🇺",
  },
  {
    id: 7,
    label: "Programando entrega",
    description: "Tu pedido fue liberado por aduana. Estamos coordinando la entrega con el destinatario.",
    icon: "📍",
  },
  {
    id: 8,
    label: "Entregado",
    description: "¡Tu pedido fue entregado exitosamente! Gracias por tu confianza.",
    icon: "🎉",
  },
] as const;

// ----- NOMBRES MOSTRADOS AL USUARIO -------------------------
export const PRODUCT_LABELS: Record<ProductType, string> = {
  motorcycle: "Motocicleta",
  solar_kit: "Kit Solar",
  electric_tricycle: "Triciclo",
};

// ----- DURACIÓN TOTAL POR PRODUCTO (días) -------------------
export const PRODUCT_TOTAL_DAYS: Record<ProductType, number> = {
  motorcycle: 100,
  solar_kit: 140,
  electric_tricycle: 150,
};

// ----- RANGOS DE DÍAS → ETAPA PÚBLICA -----------------------
// Cada entrada: { stage: número de etapa, from: día inicio, to: día fin }
// El sistema busca en qué rango caen los días transcurridos
export const STAGE_RANGES: Record<
  ProductType,
  { stage: number; from: number; to: number }[]
> = {
  motorcycle: [
    { stage: 1, from: 0, to: 1 },
    { stage: 2, from: 2, to: 4 },
    { stage: 3, from: 5, to: 15 },
    { stage: 4, from: 16, to: 41 },
    { stage: 5, from: 42, to: 69 },
    { stage: 6, from: 70, to: 98 },
    { stage: 7, from: 99, to: 99 },
    { stage: 8, from: 100, to: Infinity },
  ],
  solar_kit: [
    { stage: 1, from: 0, to: 1 },
    { stage: 2, from: 2, to: 4 },
    { stage: 3, from: 5, to: 19 },
    { stage: 4, from: 20, to: 49 },
    { stage: 5, from: 50, to: 79 },
    { stage: 6, from: 80, to: 138 },
    { stage: 7, from: 139, to: 139 },
    { stage: 8, from: 140, to: Infinity },
  ],
  electric_tricycle: [
    { stage: 1, from: 0, to: 1 },
    { stage: 2, from: 2, to: 4 },
    { stage: 3, from: 5, to: 19 },
    { stage: 4, from: 20, to: 49 },
    { stage: 5, from: 50, to: 81 },
    { stage: 6, from: 82, to: 148 },
    { stage: 7, from: 149, to: 149 },
    { stage: 8, from: 150, to: Infinity },
  ],
};

// ----- PASOS INTERNOS (uso del equipo, NO se muestra al cliente) ---
// day: día en que ocurre
// label: descripción interna
// publicStage: a qué etapa pública pertenece este paso
export const INTERNAL_STEPS: Record<
  ProductType,
  { day: number; label: string; publicStage: number }[]
> = {
  motorcycle: [
    { day: 0, label: "Pedido confirmado — Se registró la compra y se generó el número de seguimiento", publicStage: 1 },
    { day: 2, label: "Pago verificado — El pago fue recibido y aprobado", publicStage: 2 },
    { day: 5, label: "Inspección mecánica — Se verifica el estado general de la motocicleta", publicStage: 3 },
    { day: 8, label: "Preparación para exportación — La unidad es acondicionada para el envío", publicStage: 3 },
    { day: 12, label: "Embalaje de exportación — La motocicleta es protegida para el transporte", publicStage: 3 },
    { day: 16, label: "Documentación de exportación — Se preparan los documentos necesarios", publicStage: 4 },
    { day: 20, label: "Ingreso al puerto de Miami — La carga ingresa al recinto portuario", publicStage: 4 },
    { day: 24, label: "Revisión por Aduana de EE. UU. — Control documental y de exportación", publicStage: 4 },
    { day: 30, label: "Inspección física de exportación — La mercancía es revisada antes de autorizar la salida", publicStage: 4 },
    { day: 34, label: "Liberado por Aduana de EE. UU. — La exportación fue aprobada", publicStage: 4 },
    { day: 38, label: "Carga en contenedor — La motocicleta queda asegurada dentro del contenedor", publicStage: 4 },
    { day: 42, label: "Buque zarpó desde Miami — Comienza el transporte marítimo", publicStage: 5 },
    { day: 58, label: "En tránsito marítimo — La carga continúa navegando hacia Cuba", publicStage: 5 },
    { day: 70, label: "Arribo al puerto de Cuba — Llegada del buque al puerto de destino", publicStage: 6 },
    { day: 73, label: "Descarga del contenedor — La motocicleta es descargada del buque", publicStage: 6 },
    { day: 76, label: "Ingreso a Aduana Cubana — Inicia el proceso de importación", publicStage: 6 },
    { day: 82, label: "Revisión documental — Se valida la documentación presentada", publicStage: 6 },
    { day: 87, label: "Inspección física — Las autoridades inspeccionan la motocicleta", publicStage: 6 },
    { day: 91, label: "Gestión documental del vehículo — Trámites administrativos previos a la entrega", publicStage: 6 },
    { day: 95, label: "En proceso aduanal — La carga permanece en revisión hasta recibir la autorización", publicStage: 6 },
    { day: 98, label: "Liberado por Aduana Cubana — La importación fue aprobada", publicStage: 6 },
    { day: 99, label: "Programando entrega — Se coordina la entrega con el destinatario", publicStage: 7 },
    { day: 100, label: "Entregado — La motocicleta fue entregada exitosamente", publicStage: 8 },
  ],
  solar_kit: [
    { day: 0, label: "Pedido confirmado — Se confirmó la compra y se generó el número de seguimiento", publicStage: 1 },
    { day: 2, label: "Pago verificado — El pago fue recibido y aprobado", publicStage: 2 },
    { day: 5, label: "Verificación de componentes — Se revisa que el kit esté completo", publicStage: 3 },
    { day: 10, label: "Pruebas de funcionamiento — Se verifica el correcto funcionamiento de todos los componentes", publicStage: 3 },
    { day: 15, label: "Embalaje reforzado — Los paneles y accesorios son protegidos para el transporte", publicStage: 3 },
    { day: 20, label: "Documentación de exportación — Se prepara la documentación necesaria", publicStage: 4 },
    { day: 25, label: "Ingreso al puerto de Miami — La carga ingresa al recinto portuario", publicStage: 4 },
    { day: 30, label: "Revisión por Aduana de EE. UU. — Se verifica la documentación y la mercancía", publicStage: 4 },
    { day: 36, label: "Inspección física de exportación — La carga es inspeccionada por la autoridad correspondiente", publicStage: 4 },
    { day: 42, label: "Liberado por Aduana de EE. UU. — La exportación queda autorizada", publicStage: 4 },
    { day: 46, label: "Consolidación del contenedor — El kit solar es ubicado junto con otras cargas de exportación", publicStage: 4 },
    { day: 50, label: "Buque zarpó desde Miami — Comienza el transporte marítimo hacia Cuba", publicStage: 5 },
    { day: 66, label: "En tránsito marítimo — La carga continúa su recorrido", publicStage: 5 },
    { day: 80, label: "Arribo al puerto de Cuba — Llegada del buque al puerto de destino", publicStage: 6 },
    { day: 84, label: "Descarga del contenedor — La carga es descargada", publicStage: 6 },
    { day: 88, label: "Ingreso a Aduana Cubana — Comienza el proceso de importación", publicStage: 6 },
    { day: 98, label: "Revisión documental — Se verifica toda la documentación", publicStage: 6 },
    { day: 110, label: "Inspección de la carga — Se inspeccionan los componentes del kit solar", publicStage: 6 },
    { day: 122, label: "En proceso aduanal — La carga permanece en revisión hasta su liberación", publicStage: 6 },
    { day: 136, label: "Liberado por Aduana Cubana — La importación fue aprobada", publicStage: 6 },
    { day: 139, label: "Programando entrega — Se coordina la entrega con el destinatario", publicStage: 7 },
    { day: 140, label: "Entregado — El kit solar fue entregado exitosamente", publicStage: 8 },
  ],
  electric_tricycle: [
    { day: 0, label: "Pedido confirmado — Se confirmó la compra y se generó el número de seguimiento", publicStage: 1 },
    { day: 2, label: "Pago verificado — El pago fue recibido y aprobado", publicStage: 2 },
    { day: 5, label: "Preparación del vehículo — Revisión general del triciclo antes del envío", publicStage: 3 },
    { day: 10, label: "Inspección técnica — Se verifica el funcionamiento y el estado físico de la unidad", publicStage: 3 },
    { day: 15, label: "Embalaje de exportación — El triciclo es protegido y asegurado para el transporte marítimo", publicStage: 3 },
    { day: 20, label: "Documentación de exportación — Se prepara toda la documentación necesaria", publicStage: 4 },
    { day: 25, label: "Ingreso al puerto de Miami — La unidad ingresa al recinto portuario", publicStage: 4 },
    { day: 30, label: "Revisión por Aduana de EE. UU. — Verificación de documentación y mercancía", publicStage: 4 },
    { day: 36, label: "Inspección física de exportación — La autoridad inspecciona la carga antes de autorizar la salida", publicStage: 4 },
    { day: 42, label: "Liberado por Aduana de EE. UU. — La exportación queda autorizada", publicStage: 4 },
    { day: 46, label: "Carga en contenedor — El triciclo es asegurado dentro del contenedor marítimo", publicStage: 4 },
    { day: 50, label: "Buque zarpó desde Miami — La embarcación inicia su viaje hacia Cuba", publicStage: 5 },
    { day: 65, label: "En tránsito marítimo — El contenedor continúa navegando hacia el puerto de destino", publicStage: 5 },
    { day: 82, label: "Arribo al puerto de Cuba — El buque llega al puerto de destino", publicStage: 6 },
    { day: 86, label: "Descarga del contenedor — La carga es descargada del buque", publicStage: 6 },
    { day: 90, label: "Ingreso a Aduana Cubana — Comienza el proceso de importación", publicStage: 6 },
    { day: 100, label: "Revisión documental — Se valida toda la documentación presentada", publicStage: 6 },
    { day: 112, label: "Inspección física — Las autoridades realizan la inspección del vehículo", publicStage: 6 },
    { day: 126, label: "Gestión documental del vehículo — Trámites administrativos previos a la entrega", publicStage: 6 },
    { day: 140, label: "En proceso aduanal — La carga permanece en espera de la autorización final", publicStage: 6 },
    { day: 146, label: "Liberado por Aduana Cubana — La importación fue aprobada", publicStage: 6 },
    { day: 149, label: "Programando entrega — Se coordina la entrega con el destinatario", publicStage: 7 },
    { day: 150, label: "Entregado — El triciclo fue entregado exitosamente", publicStage: 8 },
  ],
};

// ----- FUNCIÓN UTILITARIA: calcular etapa pública actual -----
export function getCurrentStage(
  productType: ProductType,
  createdAt: string // formato YYYY-MM-DD
): { stageNumber: number; daysElapsed: number } {
  const created = new Date(createdAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  created.setHours(0, 0, 0, 0);

  const daysElapsed = Math.floor(
    (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalDays = PRODUCT_TOTAL_DAYS[productType];
  const ranges = STAGE_RANGES[productType];

  // Si se pasó del total sin marcar entregado, queda fijo en etapa 6
  if (daysElapsed > totalDays) {
    return { stageNumber: 6, daysElapsed };
  }

  const match = ranges.find((r) => daysElapsed >= r.from && daysElapsed <= r.to);
  return {
    stageNumber: match ? match.stage : 1,
    daysElapsed,
  };
}

// ----- FUNCIÓN UTILITARIA: fecha estimada de entrega ---------
export function getEstimatedDelivery(
  productType: ProductType,
  createdAt: string
): string {
  const created = new Date(createdAt);
  const totalDays = PRODUCT_TOTAL_DAYS[productType];
  const delivery = new Date(created);
  delivery.setDate(delivery.getDate() + totalDays);
  return delivery.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
