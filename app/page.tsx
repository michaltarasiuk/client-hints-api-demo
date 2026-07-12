import { AdaptiveDashboard } from "@/components/demo/adaptive-dashboard";
import { DemoTabs } from "@/components/demo/demo-tabs";
import { HintsPanel } from "@/components/demo/hints-panel";
import { MarkupMetrics } from "@/components/demo/markup-metrics";
import { TraditionalDashboard } from "@/components/demo/traditional-dashboard";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dedent from "dedent";
import { InfoIcon } from "lucide-react";

export default async function Home() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          User-Agent Client Hints API
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Smaller HTML when mobile and desktop UIs differ
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          When mobile and desktop layouts are structurally different, a common
          pattern is to render both and hide one with CSS. The browser still
          downloads all of that markup. With Client Hints, the server reads{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-sm">
            Sec-CH-UA-Mobile
          </code>{" "}
          and ships only the matching UI.
        </p>
      </header>

      <Alert>
        <InfoIcon />
        <AlertTitle>Browser support & caveats</AlertTitle>
        <AlertDescription>
          Client Hints are Chromium-first; Safari and Firefox have limited
          support. When <code>Sec-CH-UA-Mobile</code> is missing, this demo
          falls back to the Tailwind responsive pattern (both UIs in HTML, hide
          one with CSS) — same as the traditional tab.{" "}
          <code>Sec-CH-UA-Mobile</code> reflects browser preference, not just
          hardware — e.g. &quot;Request Desktop Site&quot; returns{" "}
          <code>?0</code> on a phone. Best for structurally different UIs, not
          subtle responsive tweaks.
        </AlertDescription>
      </Alert>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Live comparison</h2>
        <DemoTabs
          traditional={<TraditionalDashboard />}
          adaptive={<AdaptiveDashboard />}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Markup size metrics</h2>
        <p className="text-sm text-muted-foreground">
          Measured from rendered dashboard markup in the browser (innerHTML byte
          length) for the product inventory UI above.
        </p>
        <MarkupMetrics />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Server-side branching</h2>
        <CodeBlock
          code={dedent`
            import { headers } from "next/headers";

            export async function getDeviceClass() {
              const h = await headers();
              const mobile = h.get("sec-ch-ua-mobile");

              return mobile === "?1"
                ? "mobile"
                : mobile === "?0"
                  ? "desktop"
                  : null;
            }

            // In a Server Component:
            const device = await getDeviceClass();
            return device === null ? (
              <>
                <div className="md:hidden"><MobileUI /></div>
                <div className="hidden md:block"><DesktopUI /></div>
              </>
            ) : device === "mobile" ? (
              <MobileUI />
            ) : (
              <DesktopUI />
            );
          `}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Detected hints</h2>
        <HintsPanel />
      </section>
    </main>
  );
}
