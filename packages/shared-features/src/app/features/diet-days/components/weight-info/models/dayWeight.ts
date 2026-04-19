import { Meal } from 'src/app/core/models/meal';

export interface DayWeight {
    weight: number;
    date: Date;
    name?: string;
    notes?: string;
    meals: Meal[];
}

