import type { Activity } from "../../../types/activity.types";
import TVConsts from '../../../data/constants.json';
import Formatter from '../utils/formatter.service';

const THEVOIDs_CONSTANTS: { [key: string]: string } = TVConsts;

class StandartActivityLoader {
    public execute = (path: string): Activity[] => {
        const activities = [];

        const file = Formatter.FromJSONwithPath(path);
        
        for(const activity of file) {
            for(const key in THEVOIDs_CONSTANTS)
                if(activity.text.indexOf(`\$\{${key}\}`) !== -1)
                    activity.text = activity.text.replace(`\$\{${key}\}`, THEVOIDs_CONSTANTS[key]);

            activities.push(activity);
        };
    
        return activities;
    };
};

export default StandartActivityLoader;