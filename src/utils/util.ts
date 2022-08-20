import fs from "fs";

export class Util {
  public validateDirectory(directory: string): boolean {
    return fs.existsSync(directory);
  }

  public async importFile(filePath: string): Promise<any> {
    return (await import(filePath))?.default;
  }
}
