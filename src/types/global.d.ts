export {};

declare global {
  interface Window {
    ezstandalone: {
      cmd: Array<() => void>;
      hasInit?: boolean;
      define?: (id: number) => void;
      display?: () => void;
      enable?: () => void;
      destroyAll?: () => void;
      refresh?: () => void;
    };
    ezoic?: {
      rewarded?: {
        requestAndShow: (cb: (rewardGranted: boolean) => void) => void;
      };
    };
  }
}
