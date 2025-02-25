import Formatter from "f-formatter";

class UtilityLoader {
	public execute = (path: string) => {
		const file = new Formatter().FromJSONWithPath(path);
		let data: string[] | { [key: string]: string[] };

		if (Array.isArray(file)) {
			data = [];

			for (const element of file) {
				data.push(element);
			}
		} else {
			data = {};

			for (const key in file) {
				const value = file[key];

				data[key] = value;
			}
		}

		return data;
	};
}

export default UtilityLoader;
