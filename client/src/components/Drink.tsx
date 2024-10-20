import DrinkType from "../types/Drink";

const Drink = ({ drinkData }: { drinkData: DrinkType }) => {
  const { name, price, amount } = drinkData;

  return (
    <div className="flex w-full justify-between text-sm md:text-lg">
      <div className="flex items-center">
        <p>
          <span className="font-bold">{amount && `${amount}l`}</span> {name}
        </p>
      </div>
      <p>{price}€</p>
    </div>
  );
};

export default Drink;
