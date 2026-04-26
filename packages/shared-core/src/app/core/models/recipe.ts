import { CustomProduct } from './customProduct';

export interface Recipe {
  _id?: string;
  name: string;
  description?: string;
  customProducts?: CustomProduct[];
  verified?: boolean;
  userId?: string;
}
