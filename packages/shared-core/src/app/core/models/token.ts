export interface Token {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  theme?: string;
  error?: string;
}
