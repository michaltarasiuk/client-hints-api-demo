"use client";

import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatBytes,
  sourceLabel,
  type DetectionSource,
  type DeviceClass,
} from "@/lib/client-hints-shared";

interface MarkupMetricsClientProps {
  device: DeviceClass | null;
  source: DetectionSource;
  traditional: React.ReactNode;
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}

export function MarkupMetricsClient({
  device,
  source,
  traditional,
  mobile,
  desktop,
}: MarkupMetricsClientProps) {
  const traditionalRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<{
    traditionalSize: number;
    adaptiveSize: number;
    savings: number;
    savingsPercent: number;
  } | null>(null);

  useEffect(() => {
    const traditionalSize = traditionalRef.current?.innerHTML.length ?? 0;
    const mobileSize = mobileRef.current?.innerHTML.length ?? 0;
    const desktopSize = desktopRef.current?.innerHTML.length ?? 0;
    const adaptiveSize =
      source === "responsive"
        ? traditionalSize
        : device === "mobile"
          ? mobileSize
          : desktopSize;
    const savings = traditionalSize - adaptiveSize;
    const savingsPercent =
      traditionalSize > 0 ? Math.round((savings / traditionalSize) * 100) : 0;

    setSizes({
      traditionalSize,
      adaptiveSize,
      savings,
      savingsPercent,
    });
  }, [device, source]);

  return (
    <>
      <div className="sr-only" aria-hidden>
        <div ref={traditionalRef}>{traditional}</div>
        <div ref={mobileRef}>{mobile}</div>
        <div ref={desktopRef}>{desktop}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Traditional approach</CardTitle>
            <CardDescription>
              Both mobile and desktop markup in HTML
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Markup size</span>
              <span className="font-mono text-sm font-medium">
                {sizes ? formatBytes(sizes.traditionalSize) : "Measuring…"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Variants shipped
              </span>
              <Badge variant="secondary">2</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Hints approach</CardTitle>
            <CardDescription>
              {source === "responsive"
                ? "No hint — falls back to responsive CSS (both variants)"
                : "Server renders one variant for this device"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Markup size</span>
              <span className="font-mono text-sm font-medium">
                {sizes ? formatBytes(sizes.adaptiveSize) : "Measuring…"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Variants shipped
              </span>
              <Badge>{source === "responsive" ? "2" : "1"}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings on this request</CardTitle>
            <CardDescription>
              {source === "responsive"
                ? "No Sec-CH-UA-Mobile — responsive CSS fallback"
                : `Detected as ${device} via ${sourceLabel(source)}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Bytes saved</span>
              <span className="font-mono text-sm font-medium text-green-600 dark:text-green-400">
                {sizes ? formatBytes(sizes.savings) : "Measuring…"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reduction</span>
              <Badge variant="outline">
                {sizes ? `${sizes.savingsPercent}%` : "—"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
