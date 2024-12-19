import ollama from "ollama";

import path from "path";
import fs from "fs";

const file = fs.readFileSync(path.join(__dirname, "settings.json"), "utf-8");
const json: { settings: string; required: string; data: string } = JSON.parse(file);

const model = "FROM llama3.3";
const system = `SYSTEM "${json.required + " " + json.data + " " + json.settings}"`;

(async () => {
	await ollama.create({
		model: "TheVoid",
		modelfile: [model, system].join("\n")
	});
})();
