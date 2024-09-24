import type { Activity } from "../../../types/activity.types";
import TVConsts from '../../../data/constants.json';
import Formatter from '../utils/formatter.service';

const THEVOIDs_CONSTANTS: { [key: string]: string } = TVConsts;

class TypifiedActivityLoader {
    public execute = (path: string): Activity[] => {
        const file = Formatter.FromJSONwithPath(path);

        const activities = [];

        for(const activity of file.activities) {
            let activityText: string = activity;
            
            for(const key in THEVOIDs_CONSTANTS) {
                if(activityText.indexOf(`\$\{${key}\}`) !== -1)
                    activityText = activityText.replace(`\$\{${key}\}`, THEVOIDs_CONSTANTS[key]);
            };

            activities.push({ text: activityText, type: file.type });
        };

        return activities;
    };
};

export default TypifiedActivityLoader;