import { resolve } from "node:path";
import { readdir, writeFile, readFile, stat } from "node:fs/promises";
import * as dayjs from "dayjs";

import { Appointment } from "../models/appointment";
import { State, Store } from "../ports/store";

export class FileStore implements Store {
  private static readonly DIRECTORY = resolve(__dirname, "../../store");

  private fileName: string;

  private constructor(fileName: string) {
    this.fileName = fileName;
  }

  static async initStore(): Promise<FileStore> {
    try {
      const files = await readdir(FileStore.DIRECTORY);

      for (const fileName of files) {
        const { ctimeMs } = await stat(`${FileStore.DIRECTORY}/${fileName}`);

        if (dayjs(ctimeMs).isAfter(dayjs().startOf("d"))) {
          return new FileStore(fileName);
        }
      }

      const fileName = FileStore.createName();
      await FileStore.writeStore(fileName, {});

      return new FileStore(fileName);
    } catch (error) {
      throw `Internal Error: ${(error as Error).message}`;
    }
  }

  private static createName(): string {
    return `${new Date().toISOString().split("T")[0]}-store.json`;
  }

  private static async readStore(fileName: string): Promise<State> {
    const file = await readFile(`${FileStore.DIRECTORY}/${fileName}`, "utf-8");

    return JSON.parse(file);
  }

  private static async writeStore(fileName: string, state: State): Promise<void> {
    await writeFile(`${FileStore.DIRECTORY}/${fileName}`, JSON.stringify(state));
  }

  async getState(key: string): Promise<Appointment> {
    const store = await FileStore.readStore(this.fileName);

    return store[key];
  }

  async setState(key: string, value: Appointment): Promise<void> {
    const store = await FileStore.readStore(this.fileName);

    await FileStore.writeStore(this.fileName, { ...store, [key]: value });
  }
}
