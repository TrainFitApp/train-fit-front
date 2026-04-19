export class Exercise {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  muscleGroups1: string[];
  muscleGroups2: string[];
  category?: string[] | string;
  equipment: string[];
  gifUrl: string;
  isCardio?: boolean;
  userId?: string;
}
