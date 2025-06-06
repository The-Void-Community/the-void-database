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
    const filePath = path.join(
      __dirname,
      "../",
      "../",
      "data",
      "constants.json",
    );
    const str = JSON.stringify(this._constants, this.replacer, this.space);

    fs.writeFileSync(filePath, str, "utf-8");

    return str;
  };
}

export default Constants;
