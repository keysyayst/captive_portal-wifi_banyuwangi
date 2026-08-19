export type PortalStep = 'login' | 'otp-method' | 'otp';
export type OtpMethod = 'whatsapp' | 'sms';

export interface BackgroundImage {
  url: string;
  alt: string;
}

/** Local UI state for the login card (kept separate from what actually gets posted to the server). */
export interface PortalLoginState {
  countryCode: string;
  phone: string;
  agreed: boolean;
  method: OtpMethod;
  otp: string[];
}

/** Payload sent to the backend once OTP verification succeeds. */
export interface PortalLoginPayload {
  phone: string;
  otp: string;
  method: OtpMethod;
  nik?: string;
  mac_address?: string;
  ap_location?: string;
}
