import { Meal } from "../../../../../core/models/meal";

export interface DayWeight {
    weight: number;
    date: Date;
    name?: string;
    notes?: string;
    meals: Meal[];
}
