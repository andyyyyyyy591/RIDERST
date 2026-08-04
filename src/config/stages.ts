// ============================================================
// ARCHIVO CENTRAL DE CONFIGURACIÓN — EDITAR AQUÍ
// ============================================================

export type ProductType = "motorcycle" | "solar_kit" | "electric_tricycle";

export type PhaseKey =
  | "pedido_confirmado"
  | "pago_verificado"
  | "preparando_envio"
  | "tramites_exportacion"
  | "transito_maritimo"
  | "llego_a_cuba_aduana"
  | "programando_entrega"
  | "entregado";

// ----- 8 FASES DEL TIMELINE VISIBLE (lo que ve el cliente) --
export const TIMELINE_PHASES: { id: number; key: PhaseKey; label: string }[] = [
  { id: 1, key: "pedido_confirmado",    label: "Pedido confirmado" },
  { id: 2, key: "pago_verificado",      label: "Pago verificado" },
  { id: 3, key: "preparando_envio",     label: "Preparando tu envío" },
  { id: 4, key: "tramites_exportacion", label: "En trámites de exportación" },
  { id: 5, key: "transito_maritimo",    label: "En tránsito marítimo" },
  { id: 6, key: "llego_a_cuba_aduana",  label: "Llegó a Cuba — en aduana" },
  { id: 7, key: "programando_entrega",  label: "Programando entrega" },
  { id: 8, key: "entregado",            label: "Entregado" },
];

// ----- NOMBRES MOSTRADOS AL USUARIO -------------------------
export const PRODUCT_LABELS: Record<ProductType, string> = {
  motorcycle:        "Motocicleta",
  solar_kit:         "Kit Solar",
  electric_tricycle: "Triciclo",
};

// ----- DURACIÓN TOTAL POR PRODUCTO (días) -------------------
export const PRODUCT_TOTAL_DAYS: Record<ProductType, number> = {
  motorcycle:        100,
  solar_kit:         140,
  electric_tricycle: 150,
};

// ----- ESTADOS INTERNOS POR PRODUCTO ------------------------
// Cada entrada: día en que ocurre, phase del timeline a resaltar,
// titulo y texto que aparecen en el bloque "ESTADO ACTUAL"
export type InternalState = {
  day: number;
  phase: PhaseKey;
  titulo: string;
  texto: string;
};

export const INTERNAL_STATES: Record<ProductType, InternalState[]> = {
  motorcycle: [
    { day: 0,  phase: "pedido_confirmado",    titulo: "Pedido confirmado",               texto: "Se registró la compra y se generó el número de seguimiento." },
    { day: 2,  phase: "pago_verificado",      titulo: "Pago verificado",                 texto: "El pago fue recibido y aprobado." },
    { day: 5,  phase: "preparando_envio",     titulo: "Inspección mecánica",             texto: "Se verifica el estado general de la motocicleta." },
    { day: 8,  phase: "preparando_envio",     titulo: "Preparación para exportación",    texto: "La unidad es acondicionada para el envío." },
    { day: 12, phase: "preparando_envio",     titulo: "Embalaje de exportación",         texto: "La motocicleta es protegida para el transporte." },
    { day: 16, phase: "tramites_exportacion", titulo: "Documentación de exportación",    texto: "Se preparan los documentos necesarios para la exportación." },
    { day: 20, phase: "tramites_exportacion", titulo: "Ingreso al puerto de Miami",      texto: "La carga ingresa al recinto portuario." },
    { day: 24, phase: "tramites_exportacion", titulo: "Revisión por Aduana de EE. UU.", texto: "Se realiza el control documental y de exportación." },
    { day: 30, phase: "tramites_exportacion", titulo: "Inspección física de exportación", texto: "La mercancía es revisada antes de autorizar la salida." },
    { day: 34, phase: "tramites_exportacion", titulo: "Liberado por Aduana de EE. UU.", texto: "La exportación fue aprobada." },
    { day: 38, phase: "tramites_exportacion", titulo: "Carga en contenedor",             texto: "La motocicleta queda asegurada dentro del contenedor." },
    { day: 42, phase: "transito_maritimo",    titulo: "Buque zarpó desde Miami",         texto: "Comienza el transporte marítimo." },
    { day: 58, phase: "transito_maritimo",    titulo: "En tránsito marítimo",            texto: "La carga continúa navegando hacia Cuba." },
    { day: 70, phase: "llego_a_cuba_aduana",  titulo: "Arribo al puerto de Cuba",        texto: "Llegada del buque al puerto de destino." },
    { day: 73, phase: "llego_a_cuba_aduana",  titulo: "Descarga del contenedor",         texto: "La motocicleta es descargada del buque." },
    { day: 76, phase: "llego_a_cuba_aduana",  titulo: "Ingreso a Aduana Cubana",         texto: "Inicia el proceso de importación." },
    { day: 82, phase: "llego_a_cuba_aduana",  titulo: "Revisión documental",             texto: "Se valida la documentación presentada." },
    { day: 87, phase: "llego_a_cuba_aduana",  titulo: "Inspección física",               texto: "Las autoridades inspeccionan la motocicleta." },
    { day: 91, phase: "llego_a_cuba_aduana",  titulo: "Gestión documental del vehículo", texto: "Se completan los trámites administrativos necesarios antes de la entrega." },
    { day: 95, phase: "llego_a_cuba_aduana",  titulo: "En proceso aduanal",              texto: "La carga permanece en revisión hasta recibir la autorización de salida." },
    { day: 98, phase: "llego_a_cuba_aduana",  titulo: "Liberado por Aduana Cubana",      texto: "La importación fue aprobada." },
    { day: 99,  phase: "programando_entrega",  titulo: "Programando entrega",             texto: "Se coordina la entrega con el destinatario." },
    { day: 100, phase: "entregado",            titulo: "Entregado",                       texto: "La motocicleta fue entregada exitosamente." },
  ],

  solar_kit: [
    { day: 0,   phase: "pedido_confirmado",    titulo: "Pedido confirmado",               texto: "Se confirmó la compra y se generó el número de seguimiento." },
    { day: 2,   phase: "pago_verificado",      titulo: "Pago verificado",                 texto: "El pago fue recibido y aprobado." },
    { day: 5,   phase: "preparando_envio",     titulo: "Verificación de componentes",     texto: "Se revisa que el kit esté completo." },
    { day: 10,  phase: "preparando_envio",     titulo: "Pruebas de funcionamiento",       texto: "Se verifica el correcto funcionamiento de todos los componentes." },
    { day: 15,  phase: "preparando_envio",     titulo: "Embalaje reforzado",              texto: "Los paneles y accesorios son protegidos para el transporte." },
    { day: 20,  phase: "tramites_exportacion", titulo: "Documentación de exportación",    texto: "Se prepara la documentación necesaria para la exportación." },
    { day: 25,  phase: "tramites_exportacion", titulo: "Ingreso al puerto de Miami",      texto: "La carga ingresa al recinto portuario." },
    { day: 30,  phase: "tramites_exportacion", titulo: "Revisión por Aduana de EE. UU.", texto: "Se verifica la documentación y la mercancía antes de su salida." },
    { day: 36,  phase: "tramites_exportacion", titulo: "Inspección física de exportación", texto: "La carga es inspeccionada por la autoridad correspondiente." },
    { day: 42,  phase: "tramites_exportacion", titulo: "Liberado por Aduana de EE. UU.", texto: "La exportación queda autorizada." },
    { day: 46,  phase: "tramites_exportacion", titulo: "Consolidación del contenedor",    texto: "El kit solar es ubicado junto con otras cargas de exportación." },
    { day: 50,  phase: "transito_maritimo",    titulo: "Buque zarpó desde Miami",         texto: "Comienza el transporte marítimo hacia Cuba." },
    { day: 66,  phase: "transito_maritimo",    titulo: "En tránsito marítimo",            texto: "La carga continúa su recorrido." },
    { day: 80,  phase: "llego_a_cuba_aduana",  titulo: "Arribo al puerto de Cuba",        texto: "Llegada del buque al puerto de destino." },
    { day: 84,  phase: "llego_a_cuba_aduana",  titulo: "Descarga del contenedor",         texto: "La carga es descargada." },
    { day: 88,  phase: "llego_a_cuba_aduana",  titulo: "Ingreso a Aduana Cubana",         texto: "Comienza el proceso de importación." },
    { day: 98,  phase: "llego_a_cuba_aduana",  titulo: "Revisión documental",             texto: "Se verifica toda la documentación." },
    { day: 110, phase: "llego_a_cuba_aduana",  titulo: "Inspección de la carga",          texto: "Se inspeccionan los componentes del kit solar." },
    { day: 122, phase: "llego_a_cuba_aduana",  titulo: "En proceso aduanal",              texto: "La carga permanece en revisión hasta su liberación." },
    { day: 136, phase: "llego_a_cuba_aduana",  titulo: "Liberado por Aduana Cubana",      texto: "La importación fue aprobada." },
    { day: 139, phase: "programando_entrega",  titulo: "Programando entrega",             texto: "Se coordina la entrega con el destinatario." },
    { day: 140, phase: "entregado",            titulo: "Entregado",                       texto: "El kit solar fue entregado exitosamente." },
  ],

  electric_tricycle: [
    { day: 0,   phase: "pedido_confirmado",    titulo: "Pedido confirmado",               texto: "Se confirmó la compra y se generó el número de seguimiento." },
    { day: 2,   phase: "pago_verificado",      titulo: "Pago verificado",                 texto: "El pago fue recibido y aprobado." },
    { day: 5,   phase: "preparando_envio",     titulo: "Preparación del vehículo",        texto: "Se realiza una revisión general del triciclo antes del envío." },
    { day: 10,  phase: "preparando_envio",     titulo: "Inspección técnica",              texto: "Se verifica el funcionamiento y el estado físico de la unidad." },
    { day: 15,  phase: "preparando_envio",     titulo: "Embalaje de exportación",         texto: "El triciclo es protegido y asegurado para el transporte marítimo." },
    { day: 20,  phase: "tramites_exportacion", titulo: "Documentación de exportación",    texto: "Se prepara toda la documentación necesaria para exportar desde Estados Unidos." },
    { day: 25,  phase: "tramites_exportacion", titulo: "Ingreso al puerto de Miami",      texto: "La unidad ingresa al recinto portuario para su procesamiento." },
    { day: 30,  phase: "tramites_exportacion", titulo: "Revisión por Aduana de EE. UU.", texto: "La carga entra en control de exportación para verificar la documentación y la mercancía." },
    { day: 36,  phase: "tramites_exportacion", titulo: "Inspección física de exportación", texto: "La autoridad inspecciona la carga antes de autorizar su salida." },
    { day: 42,  phase: "tramites_exportacion", titulo: "Liberado por Aduana de EE. UU.", texto: "La exportación queda autorizada." },
    { day: 46,  phase: "tramites_exportacion", titulo: "Carga en contenedor",             texto: "El triciclo es asegurado dentro del contenedor marítimo." },
    { day: 50,  phase: "transito_maritimo",    titulo: "Buque zarpó desde Miami",         texto: "La embarcación inicia su viaje hacia Cuba." },
    { day: 65,  phase: "transito_maritimo",    titulo: "En tránsito marítimo",            texto: "El contenedor continúa navegando hacia el puerto de destino." },
    { day: 82,  phase: "llego_a_cuba_aduana",  titulo: "Arribo al puerto de Cuba",        texto: "El buque llega al puerto de destino." },
    { day: 86,  phase: "llego_a_cuba_aduana",  titulo: "Descarga del contenedor",         texto: "La carga es descargada del buque." },
    { day: 90,  phase: "llego_a_cuba_aduana",  titulo: "Ingreso a Aduana Cubana",         texto: "Comienza el proceso de importación." },
    { day: 100, phase: "llego_a_cuba_aduana",  titulo: "Revisión documental",             texto: "Se valida toda la documentación presentada." },
    { day: 112, phase: "llego_a_cuba_aduana",  titulo: "Inspección física",               texto: "Las autoridades realizan la inspección del vehículo." },
    { day: 126, phase: "llego_a_cuba_aduana",  titulo: "Gestión documental del vehículo", texto: "Se completan los trámites administrativos necesarios antes de la entrega." },
    { day: 140, phase: "llego_a_cuba_aduana",  titulo: "En proceso aduanal",              texto: "La carga permanece en espera de la autorización final." },
    { day: 146, phase: "llego_a_cuba_aduana",  titulo: "Liberado por Aduana Cubana",      texto: "La importación fue aprobada." },
    { day: 149, phase: "programando_entrega",  titulo: "Programando entrega",             texto: "Se coordina la entrega con el destinatario." },
    { day: 150, phase: "entregado",            titulo: "Entregado",                       texto: "El triciclo fue entregado exitosamente." },
  ],
};

// ----- FUNCIÓN PRINCIPAL: estado actual según días -----------
export function getCurrentState(
  productType: ProductType,
  createdAt: string // YYYY-MM-DD
): { phase: PhaseKey; titulo: string; texto: string; daysElapsed: number } {
  const created = new Date(createdAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  created.setHours(0, 0, 0, 0);

  const daysElapsed = Math.floor(
    (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  );

  const states = INTERNAL_STATES[productType];
  const totalDays = PRODUCT_TOTAL_DAYS[productType];

  // Buscar el último estado cuyo día <= daysElapsed
  let current = states[0];
  for (const state of states) {
    if (daysElapsed >= state.day) {
      current = state;
    } else {
      break;
    }
  }

  // Si pasó el total de días sin entrega, quedar fijo en el último estado
  if (daysElapsed > totalDays) {
    current = states[states.length - 1];
  }

  return { ...current, daysElapsed };
}
