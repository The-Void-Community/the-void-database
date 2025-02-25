import type { Activity, ConstantsTypes } from "../../types/activity.types";
import TVConsts from "../../data/constants.json";
import Formatter from "f-formatter";

const THEVOIDs_CONSTANTS: ConstantsTypes = TVConsts;

class StandartActivityLoader {
	public execute = (path: string): Activity[] => {
		const activities = [];

		const file = new Formatter().FromJSONWithPath(path);

		for (const activity of file) {
			for (const k in THEVOIDs_CONSTANTS) {
				const key = k as (keyof typeof THEVOIDs_CONSTANTS);

				if (activity.text.indexOf(`\$\{${key}\}`) !== -1)
					activity.text = activity.text.replace(
						`\$\{${key}\}`,
						THEVOIDs_CONSTANTS[key]
					);
			}

			activities.push(activity);
		}

		return activities;
	};
}

export default StandartActivityLoader;
