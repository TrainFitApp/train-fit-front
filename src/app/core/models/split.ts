import { Workout } from "./workout";

export class Split {
    _id: string;
    name?: string;
    workouts: Workout[];
}