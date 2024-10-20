import { MealType } from "./Meal";

export type MenuType = {
  success: boolean;
  hits: number;
  data: MealType[] | [];
};
