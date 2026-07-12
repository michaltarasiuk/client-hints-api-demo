import "server-only";

import { DesktopDashboard } from "@/components/demo/desktop-dashboard";
import { MobileDashboard } from "@/components/demo/mobile-dashboard";
import { TraditionalDashboard } from "@/components/demo/traditional-dashboard";
import { getDeviceDetection } from "@/lib/client-hints";

export async function AdaptiveDashboard() {
  const { device, source } = await getDeviceDetection();

  return source === "responsive" ? (
    <TraditionalDashboard />
  ) : device === "mobile" ? (
    <MobileDashboard />
  ) : (
    <DesktopDashboard />
  );
}
