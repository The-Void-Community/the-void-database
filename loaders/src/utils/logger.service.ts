import Formatter, { Colors } from "../utils/formatter.service";
import type { LoggerName } from "../../../types/loggers.types";

class InitLogger {
	private readonly _name: string;
	private readonly _colors: [Colors, Colors];

	constructor(name: string, colors: [Colors, Colors]) {
		this._name = name;
		this._colors = colors;
	}

	public readonly execute = (text: string, color?: Colors): string => {
		const txt =
			(Formatter.Color(this._name, this._colors[0]) + ":",
			Formatter.Color(text, color ? color : this._colors[1]));

		console.log(
			Formatter.Color(this._name, this._colors[0]) + ":",
			Formatter.Color(text, color ? color : this._colors[1])
		);

		return txt;
	};

	get colors(): [Colors, Colors] {
		return this._colors;
	}
}

const LoggersNames: {
	[key: LoggerName<string>]: { name: string; colors: [Colors, Colors] };
} = {
	TheVoid: { name: "The Void", colors: [Colors.red, Colors.magenta] },
	Updater: { name: "Updater", colors: [Colors.brightYellow, Colors.yellow] },
	Activity: { name: "Activity", colors: [Colors.brightRed, Colors.green] },
	Events: { name: "Events", colors: [Colors.brightYellow, Colors.green] },
	Commands: { name: "Commands", colors: [Colors.brightYellow, Colors.green] },
	Loader: { name: "Loader", colors: [Colors.brightYellow, Colors.red] },
	Fail: { name: "Fail", colors: [Colors.red, Colors.red] }
};

const loggers: { [key: string]: InitLogger } = {};

for (const key in LoggersNames) {
	const logger = LoggersNames[key];

	loggers[key] = new InitLogger(logger.name, logger.colors);
}

class Logger<T extends string> {
	private readonly _name: LoggerName<T>;
	private readonly _colors: [Colors, Colors];

	private _logger: InitLogger;

	constructor(name: LoggerName<T>, colors?: [Colors, Colors]) {
		this._name = name;
		this._colors = colors ? colors : loggers[name].colors;

		this._logger = this.init();
	}

	private readonly init = (): InitLogger => {
		this._logger = new InitLogger(this._name, this._colors);

		return this._logger;
	};

	public readonly execute = (text: string, color?: Colors): string => {
		return this._logger.execute(text, color);
	};
}

export default Logger;
