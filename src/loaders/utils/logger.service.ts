import { LoggerName } from "fock-logger/dist/data/loggers.types";

import Logger, { Colors } from "fock-logger";

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

for (const key in LoggersNames) {
  const logger = LoggersNames[key];
  new Logger(logger.name, { colors: logger.colors });
}
