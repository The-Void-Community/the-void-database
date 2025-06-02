import type { Activity, ConstantsTypes } from "../../types/activity.types";
import TVConsts from "../../data/constants.json";
import Formatter from "f-formatter";

const THEVOIDs_CONSTANTS: ConstantsTypes = TVConsts;

class TypifiedActivityLoader {
  public execute = (path: string): Activity[] => {
    const file = new Formatter().FromJSONWithPath(path);

    const activities = [];

    for (const activity of file.activities) {
      let activityText: string = activity;

      for (const k in THEVOIDs_CONSTANTS) {
        const key = k as keyof typeof THEVOIDs_CONSTANTS;

        if (activityText.indexOf(`\$\{${key}\}`) !== -1)
          activityText = activityText.replace(`\$\{${key}\}`, THEVOIDs_CONSTANTS[key]);
      }

      activities.push({ text: activityText, type: file.type });
    }

    return activities;
  };
}

export default TypifiedActivityLoader;
