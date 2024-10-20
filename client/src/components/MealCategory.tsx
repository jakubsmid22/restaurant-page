import { MealType } from '../types/Meal';
import Meal from './Meal';

const MealCategory = ({ title, meals}: {title: string, meals: MealType[] | null}) => {
  return (
    <>
      <h1 className="uppercase text-2xl my-4 text-orange-400">{title}</h1>
      {meals && meals.length > 0 ? (
        meals.map((meal) => (
          <Meal key={meal._id} mealData={meal} />
        ))
      ) : (
        <p className="uppercase">no {title}</p>
      )}
    </>
  );
};

export default MealCategory;
