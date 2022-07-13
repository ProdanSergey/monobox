export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      PORT: string;
      SESSION_SECRET: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    user: {
      fullName: string;
      email: string;
    };
  }
}
