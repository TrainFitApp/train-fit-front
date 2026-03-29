import { Split } from "./split";

export class Table {
    _id: string;
    name: string;
    type: string;
    splits: Split[];
    urlImage?: string;
    description?: string;
    // Light search payload fields (search-tables)
    microcyclesCount?: number;
    workoutsCount?: number;
}
