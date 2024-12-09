import path from "path";
import fs from "fs";

class Constants {
	private readonly _constants: { [key: string]: string };

	private readonly replacer = undefined;
	private readonly space = 4;

	constructor(constants: { [key: string]: string }) {
		this._constants = constants;
	}

	public readonly execute = () => {
		const filePath = path.join(__dirname, "../", "../", "data", "constants.json");

		fs.writeFileSync(
			filePath,
			JSON.stringify(this._constants, this.replacer, this.space),
			"utf-8"
		);
	};
}

export default Constants;
