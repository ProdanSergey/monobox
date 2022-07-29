declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_SERVICE_URL: string;
      AUTH_SERVICE_URL: string;
    }
  }
}

export {};
