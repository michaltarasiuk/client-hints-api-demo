import "server-only";

import { DesktopDashboard } from "@/components/demo/desktop-dashboard";
import { MarkupMetricsClient } from "@/components/demo/markup-metrics-client";
import { MobileDashboard } from "@/components/demo/mobile-dashboard";
import { TraditionalDashboard } from "@/components/demo/traditional-dashboard";
import { getDeviceDetection } from "@/lib/client-hints";

export async function MarkupMetrics() {
  const { device, source } = await getDeviceDetection();

  return (
    <MarkupMetricsClient
      device={device}
      source={source}
      traditional={<TraditionalDashboard />}
      mobile={<MobileDashboard />}
      desktop={<DesktopDashboard />}
    />
  );
}
