import path from "path";
import fs from "fs";

import Logger from "fock-logger";
import Formatter, { Colors } from "../utils/formatter.service";

const dataPath = path.join(__dirname, "../", "../", "data");
const files = fs.readdirSync(dataPath).filter((file) => file.endsWith(".json"));

const objects: { [key: string]: any[] } = {
	download: [],
	idea: [],
	names: []
};

class ObjectsLoader {
	private readonly Logger = new Logger("Loader").execute;

	public readonly execute = () => {
		this.Logger("Загрузка объектов");

		for (const fileName of files) {
			const file = Formatter.FromJSONwithPath(`${dataPath}\\${fileName}`);

			objects[fileName.replace(".json", "")] = file;
			this.Logger(`Загружен ${`${fileName}`}`, Colors.green);
		}

		return objects;
	};
}

export { objects };

export default ObjectsLoader;
