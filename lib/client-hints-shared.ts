export type DeviceClass = "mobile" | "desktop";
export type DetectionSource = "client-hint" | "responsive";

export interface DeviceDetection {
  device: DeviceClass | null;
  source: DetectionSource;
}

export interface ClientHintHeaders {
  "sec-ch-ua-mobile": string | null;
  "sec-ch-ua-platform": string | null;
  "sec-ch-ua": string | null;
}

export function formatBytes(bytes: number) {
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
}

export function sourceLabel(source: DetectionSource) {
  return source === "client-hint" ? "Client Hint" : "Responsive CSS (no hint)";
}
