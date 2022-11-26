/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRELLO_API_KEY: string;
  readonly VITE_TRELLO_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
