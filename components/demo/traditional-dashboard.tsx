import { DesktopDashboard } from "@/components/demo/desktop-dashboard";
import { MobileDashboard } from "@/components/demo/mobile-dashboard";

export function TraditionalDashboard() {
  return (
    <>
      <div className="md:hidden">
        <MobileDashboard />
      </div>
      <div className="hidden md:block">
        <DesktopDashboard />
      </div>
    </>
  );
}
