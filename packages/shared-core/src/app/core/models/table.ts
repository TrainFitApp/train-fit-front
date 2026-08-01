import { Split } from "./split";

export class Table {
    _id: string;
    name: string;
    type: string;
    userId?: string;
    splits: Split[];
    urlImage?: string;
    description?: string;
    // Light search payload fields (search-tables)
    microcyclesCount?: number;
    workoutsCount?: number;
    // MVP-trainers F11/F15: presente si un profesional asignó esta rutina.
    assignedByTrainerId?: string | null;
}
