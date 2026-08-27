export type PortalStep = 'login' | 'otp-method' | 'otp';
export type OtpMethod = 'whatsapp' | 'sms';

export interface BackgroundImage {
  url: string;
  alt: string;
}


export interface PortalLoginState {
  countryCode: string;
  phone: string;
  agreed: boolean;
  method: OtpMethod;
  otp: string[];
}


export interface PortalLoginPayload {
  phone: string;
  otp: string;
  method: OtpMethod;
  nik?: string;
  mac_address?: string;
  ap_location?: string;
}
