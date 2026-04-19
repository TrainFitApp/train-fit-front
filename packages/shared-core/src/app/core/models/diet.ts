import { DietDay } from "./dietDay";

export class Diet {
    _id: string;
    name: string;
    dietsDay: DietDay[];

    kcalAverage?: number;
    proteinsGAverage?: number;
    carbohydratesGAverage?: number;
    fatGAverage?: number;
}