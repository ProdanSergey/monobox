declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECT_URL: string;
      JWT_SECRET: string;
      OTP_SECRET: string;
      PORT: string;
    }
  }
}

export {};
