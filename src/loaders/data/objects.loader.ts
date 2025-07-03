import { join } from "path";
import { readdirSync } from "fs";

import Logger from "fock-logger";
import Formatter, { Colors } from "f-formatter";

const FILE_EXTENSION = ".json" as const;
const FILES_PATH = join(__dirname, "../", "../", "data");
const FILES = readdirSync(FILES_PATH).filter((file) =>
  file.endsWith(FILE_EXTENSION),
);

const objects: {
  idea: { idea: string; ideaDetail: string }[];
  download: string[];
  names: string[];
} = {
  download: [],
  idea: [],
  names: [],
};

class ObjectsLoader {
  private readonly Logger = new Logger("Loader").execute;

  public readonly execute = () => {
    this.Logger("Загрузка объектов");

    for (const fileName of FILES) {
      const file = new Formatter().FromJSONWithPath(join(FILES_PATH, fileName));
      const name = fileName.replace(FILE_EXTENSION, "") as keyof typeof objects;

      objects[name] = file;
      this.Logger(`Загружен ${`${fileName}`}`, { color: Colors.green });
    }

    return objects;
  };
}

export { objects };

export default ObjectsLoader;
