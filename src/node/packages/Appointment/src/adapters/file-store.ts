import { resolve } from "node:path";
import { readdir, writeFile, readFile, stat } from "node:fs/promises";
import * as dayjs from "dayjs";

import { State, Store } from "../ports/store";

export class FileStore implements Store {
  private static readonly DIRECTORY = resolve(__dirname, "../../store");

  private fileName: string;

  private constructor(fileName: string) {
    this.fileName = fileName;
  }

  static async initStore(): Promise<FileStore> {
    const files = await readdir(FileStore.DIRECTORY);

    for (const fileName of files) {
      const { ctimeMs } = await stat(`${FileStore.DIRECTORY}/${fileName}`);

      if (dayjs(ctimeMs).isAfter(dayjs().startOf("d"))) {
        return new FileStore(fileName);
      }
    }

    const fileName = FileStore.createName();
    await FileStore.writeStore(fileName, "{}");

    return new FileStore(fileName);
  }

  private static createName(): string {
    return `${new Date().toISOString().split("T")[0]}-store.json`;
  }

  private static async readStore(fileName: string): Promise<string> {
    return readFile(`${FileStore.DIRECTORY}/${fileName}`, "utf-8");
  }

  private static async writeStore(fileName: string, content: string): Promise<void> {
    await writeFile(`${FileStore.DIRECTORY}/${fileName}`, content);
  }

  async getState(): Promise<State> {
    return JSON.parse(await FileStore.readStore(this.fileName));
  }

  async setState(state: State): Promise<void> {
    await FileStore.writeStore(this.fileName, JSON.stringify(state));
  }
}
