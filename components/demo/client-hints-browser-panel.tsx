"use client";

import * as errore from "errore";
import { InfoIcon } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface HighEntropyValues {
  platformVersion?: string;
  architecture?: string;
}

class HighEntropyUnavailableError extends errore.createTaggedError({
  name: "HighEntropyUnavailableError",
  message: "getHighEntropyValues is not available in this browser.",
}) {}

class HighEntropyFetchError extends errore.createTaggedError({
  name: "HighEntropyFetchError",
  message: "Failed to fetch high-entropy values",
}) {}

type UaAvailability = "pending" | "unavailable" | "ready";

async function loadHighEntropyValues(): Promise<
  HighEntropyUnavailableError | HighEntropyFetchError | HighEntropyValues
> {
  const getHighEntropyValues = navigator.userAgentData?.getHighEntropyValues;

  if (!getHighEntropyValues) {
    return new HighEntropyUnavailableError({});
  }

  return getHighEntropyValues
    .call(navigator.userAgentData!, ["platformVersion", "architecture"])
    .catch((cause) => new HighEntropyFetchError({ cause }));
}

function getUaAvailabilitySnapshot(): UaAvailability {
  return navigator.userAgentData ? "ready" : "unavailable";
}

function getUaAvailabilityServerSnapshot(): UaAvailability {
  return "pending";
}

function subscribeToUaAvailability() {
  return () => {};
}

export function ClientHintsBrowserPanel() {
  const availability = useSyncExternalStore(
    subscribeToUaAvailability,
    getUaAvailabilitySnapshot,
    getUaAvailabilityServerSnapshot,
  );
  const [highEntropy, setHighEntropy] = useState<HighEntropyValues | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchHighEntropy() {
    setLoading(true);
    setError(null);

    const values = await loadHighEntropyValues();
    setLoading(false);
    (values instanceof Error
      ? () => setError(values.message)
      : () => setHighEntropy(values))();
  }

  return availability === "pending" ? (
    <p className="text-sm text-muted-foreground">
      Reading navigator.userAgentData…
    </p>
  ) : availability === "unavailable" ? (
    <Alert>
      <InfoIcon />
      <AlertTitle>JavaScript API unavailable</AlertTitle>
      <AlertDescription>
        <code>navigator.userAgentData</code> is not supported in this browser.
        Client Hints work best in Chromium-based browsers. HTTP headers may
        still be available on the server.
      </AlertDescription>
    </Alert>
  ) : (
    <ClientHintsBrowserPanelContent
      fetchHighEntropy={fetchHighEntropy}
      highEntropy={highEntropy}
      loading={loading}
      error={error}
    />
  );
}

function ClientHintsBrowserPanelContent({
  fetchHighEntropy,
  highEntropy,
  loading,
  error,
}: {
  fetchHighEntropy: () => void;
  highEntropy: HighEntropyValues | null;
  loading: boolean;
  error: string | null;
}) {
  const uaData = navigator.userAgentData!;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">mobile</p>
          <Badge variant={uaData.mobile ? "default" : "outline"}>
            {String(uaData.mobile)}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">platform</p>
          <p className="font-mono text-sm">{uaData.platform || "—"}</p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">brands</p>
        <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs">
          {JSON.stringify(uaData.brands, null, 2)}
        </pre>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium">High-entropy values</p>
          <p className="text-xs text-muted-foreground">
            Request additional hints via <code>getHighEntropyValues()</code>
          </p>
        </div>
        <Button size="sm" onClick={fetchHighEntropy} disabled={loading}>
          {loading ? "Fetching…" : "Fetch platformVersion & architecture"}
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {highEntropy && (
          <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs">
            {JSON.stringify(highEntropy, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
