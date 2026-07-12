import "server-only";

import { headers } from "next/headers";

import type { DeviceDetection } from "@/lib/client-hints-shared";

export type {
  ClientHintHeaders,
  DetectionSource,
  DeviceClass,
  DeviceDetection,
} from "@/lib/client-hints-shared";

export { formatBytes, sourceLabel } from "@/lib/client-hints-shared";

export async function getClientHintHeaders() {
  const headersList = await headers();

  return {
    "sec-ch-ua-mobile": headersList.get("sec-ch-ua-mobile"),
    "sec-ch-ua-platform": headersList.get("sec-ch-ua-platform"),
    "sec-ch-ua": headersList.get("sec-ch-ua"),
  };
}

export async function getDeviceDetection() {
  const headersList = await headers();
  const mobileHint = headersList.get("sec-ch-ua-mobile");

  if (mobileHint === "?1") {
    return { device: "mobile", source: "client-hint" } satisfies DeviceDetection;
  }

  if (mobileHint === "?0") {
    return { device: "desktop", source: "client-hint" } satisfies DeviceDetection;
  }

  return { device: null, source: "responsive" } satisfies DeviceDetection;
}

export async function getDeviceClass() {
  const { device } = await getDeviceDetection();
  return device;
}
