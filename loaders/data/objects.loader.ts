import path from "path";
import fs from "fs";

import Logger from "fock-logger";
import Formatter, { Colors } from "f-formatter";

const dataPath = path.join(__dirname, "../", "../", "data");
const files = fs.readdirSync(dataPath).filter((file) => file.endsWith(".json"));

const objects: {
  idea: { idea: string; ideaDetail: string }[];
  download: string[];
  names: string[];
} = {
  download: [],
  idea: [],
  names: []
};

class ObjectsLoader {
  private readonly Logger = new Logger("Loader").execute;

  public readonly execute = () => {
    this.Logger("Загрузка объектов");

    for (const fileName of files) {
      const file = new Formatter().FromJSONWithPath(`${dataPath}\\${fileName}`);
      const name = fileName.replace(".json", "") as keyof typeof objects;

      objects[name] = file;
      this.Logger(`Загружен ${`${fileName}`}`, { color: Colors.green });
    }

    return objects;
  };
}

export { objects };

export default ObjectsLoader;
