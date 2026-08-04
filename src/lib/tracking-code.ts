// Genera un código único formato TDC-XXXXXXXXXX (10 dígitos)
export function generateTrackingCode(): string {
  const digits = Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000;
  return `TDC-${digits}`;
}
