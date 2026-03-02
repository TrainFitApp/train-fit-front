import { Split } from "./split";

export class Table {
    _id: string;
    name: string;
    type: string;
    splits: Split[];
    urlImage?: string;
    description?: string;
}