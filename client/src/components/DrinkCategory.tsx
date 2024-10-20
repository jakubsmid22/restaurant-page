import DrinkType from "../types/Drink";
import Drink from "./Drink";

const DrinkCategory = ({
  title,
  drinks,
}: {
  title: string;
  drinks: DrinkType[] | null
}) => {
  return (
    <>
      <h1 className="uppercase text-2xl my-4 text-orange-400">{title}</h1>
      {drinks && drinks.length > 0 ? (
        drinks.map((drink) => <Drink key={drink._id} drinkData={drink} />)
      ) : (
        <p className="uppercase">no {title}</p>
      )}
    </>
  );
};

export default DrinkCategory;
