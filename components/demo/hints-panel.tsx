import "server-only";

import { ClientHintsBrowserPanel } from "@/components/demo/client-hints-browser-panel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getClientHintHeaders } from "@/lib/client-hints";

interface HeaderRowProps {
  label: string;
  value: string | null;
}

function HeaderRow({ label, value }: HeaderRowProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="break-all font-mono text-sm">{value ?? "—"}</p>
    </div>
  );
}

export async function HintsPanel() {
  const hintHeaders = await getClientHintHeaders();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Hints debug panel</CardTitle>
        <CardDescription>
          HTTP headers received on this request and the JavaScript API in your
          browser
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">HTTP request headers (server)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <HeaderRow
              label="Sec-CH-UA-Mobile"
              value={hintHeaders["sec-ch-ua-mobile"]}
            />
            <HeaderRow
              label="Sec-CH-UA-Platform"
              value={hintHeaders["sec-ch-ua-platform"]}
            />
            <HeaderRow label="Sec-CH-UA" value={hintHeaders["sec-ch-ua"]} />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            navigator.userAgentData (client)
          </h3>
          <ClientHintsBrowserPanel />
        </div>
      </CardContent>
    </Card>
  );
}
