import fs from "fs";
export class Util {
    validateDirectory(directory) {
        return fs.existsSync(directory);
    }
    async importFile(filePath) {
        return (await import(filePath))?.default;
    }
}
