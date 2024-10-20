export type MealType = {
  _id: string;
  name: string;
  price: number;
  grammage: number | null;
  image: string | null;
  alergens: string[];
  type: string;
};
