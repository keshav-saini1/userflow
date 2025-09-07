// Type declarations for Cashfree SDK v3

export interface CashfreeInitOptions {
  mode: 'sandbox' | 'production';
}

export interface CashfreeCheckoutOptions {
  paymentSessionId: string;
  redirectTarget?: '_self' | '_blank' | '_parent' | '_top' | '_modal' | string; // string = DOM element selector
  appearance?: {
    width?: string;
    height?: string;
  };
}

export interface CashfreeInstance {
  checkout(options: CashfreeCheckoutOptions): void;
}

declare global {
  interface Window {
    Cashfree?: (options: CashfreeInitOptions) => CashfreeInstance;
  }
}
