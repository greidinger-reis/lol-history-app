import type { Region } from "../constants/regions";
import { _Region } from "../constants/regions";

export const parseRegion = (region: string) => {
    if (region in _Region) {
        return _Region[region as Region];
    }
    throw new Error(`Invalid region: ${region}`);
};
