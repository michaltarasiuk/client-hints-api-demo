interface NavigatorUADataBrand {
  brand: string;
  version: string;
}

interface NavigatorUAData {
  brands: NavigatorUADataBrand[];
  mobile: boolean;
  platform: string;
  getHighEntropyValues(hints: string[]): Promise<Record<string, string>>;
}

declare global {
  interface Navigator {
    userAgentData?: NavigatorUAData;
  }
}

export {};
