"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DemoTabsProps {
  traditional: React.ReactNode;
  adaptive: React.ReactNode;
}

export function DemoTabs({ traditional, adaptive }: DemoTabsProps) {
  return (
    <Tabs defaultValue="traditional">
      <TabsList>
        <TabsTrigger value="traditional">
          Traditional (CSS hide/show)
        </TabsTrigger>
        <TabsTrigger value="adaptive">Client Hints (server picks)</TabsTrigger>
      </TabsList>
      <TabsContent value="traditional" className="mt-4">
        {traditional}
      </TabsContent>
      <TabsContent value="adaptive" className="mt-4">
        {adaptive}
      </TabsContent>
    </Tabs>
  );
}
