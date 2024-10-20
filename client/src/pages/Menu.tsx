import { useEffect, useState } from "react";
import { MenuType } from "../types/Menu";
import axios from "axios";
import { MealType } from "../types/Meal";
import MealCategory from "../components/MealCategory";
import DrinksType from "../types/Drinks";
import DrinkType from "../types/Drink";
import DrinkCategory from "../components/DrinkCategory";

const Menu = () => {
  const [menu, setMenu] = useState<MenuType | null>(null);
  const [drinks, setDrinks] = useState<DrinksType | null>(null);

  // food
  const [soups, setSoups] = useState<MealType[] | null>(null);
  const [starters, setStarters] = useState<MealType[] | null>(null);
  const [mainCourses, setMainCourses] = useState<MealType[] | null>(null);
  const [desserts, setDesserts] = useState<MealType[] | null>(null);
  const [breads, setBreads] = useState<MealType[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("food");

  //drinks
  const [soft, setSoft] = useState<DrinkType[] | null>(null);
  const [lemonade, setLemonade] = useState<DrinkType[] | null>(null);
  const [beer, setBeer] = useState<DrinkType[] | null>(null);
  const [coffee, setCoffee] = useState<DrinkType[] | null>(null);
  const [hotDrink, setHotDrink] = useState<DrinkType[] | null>(null);
  const [rum, setRum] = useState<DrinkType[] | null>(null);
  const [whiskey, setWhiskey] = useState<DrinkType[] | null>(null);
  const [cognac, setCognac] = useState<DrinkType[] | null>(null);
  const [liqueur, setLiqueur] = useState<DrinkType[] | null>(null);
  const [spirit, setSpirit] = useState<DrinkType[] | null>(null);
  const [mixedDrink, setMixedDrink] = useState<DrinkType[] | null>(null);

  const getMenu = () => {
    axios
      .get("https://restaurant-page-eanp.onrender.com/api/all-meals")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDrinks = () => {
    axios
      .get("https://restaurant-page-eanp.onrender.com/api/all-drinks")
      .then((response) => {
        setDrinks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMenu();
    getDrinks();
  }, []);

  useEffect(() => {
    setSoups(menu ? menu.data.filter((meal) => meal.type === "soup") : null);
    setStarters(
      menu ? menu.data.filter((meal) => meal.type === "starter") : null
    );
    setMainCourses(
      menu ? menu.data.filter((meal) => meal.type === "main") : null
    );
    setDesserts(
      menu ? menu.data.filter((meal) => meal.type === "dessert") : null
    );
    setBreads(menu ? menu.data.filter((meal) => meal.type === "bread") : null);
    setSoft(
      drinks ? drinks.data.filter((drink) => drink.type === "soft") : null
    );
    setLemonade(
      drinks ? drinks.data.filter((drink) => drink.type === "lemonade") : null
    );
    setBeer(
      drinks ? drinks.data.filter((drink) => drink.type === "beer") : null
    );
    setCoffee(
      drinks ? drinks.data.filter((drink) => drink.type === "coffee") : null
    );
    setHotDrink(
      drinks ? drinks.data.filter((drink) => drink.type === "hot drink") : null
    );
    setRum(drinks ? drinks.data.filter((drink) => drink.type === "rum") : null);
    setWhiskey(
      drinks ? drinks.data.filter((drink) => drink.type === "whiskey") : null
    );
    setCognac(
      drinks ? drinks.data.filter((drink) => drink.type === "cognac") : null
    );
    setLiqueur(
      drinks ? drinks.data.filter((drink) => drink.type === "liqueur") : null
    );
    setSpirit(
      drinks ? drinks.data.filter((drink) => drink.type === "spirit") : null
    );
    setMixedDrink(
      drinks
        ? drinks.data.filter((drink) => drink.type === "mixed drink")
        : null
    );
  }, [menu]);

  return (
    <main className="min-h-screen flex flex-col items-center p-2">
      <h1 className="uppercase text-4xl my-5 text-orange-400">menu</h1>
      <div className="space-x-5">
        <button
          className={`${selectedCategory === "food" ? "font-bold" : null}`}
          onClick={() => setSelectedCategory("food")}
        >
          FOOD
        </button>
        <button
          className={`${selectedCategory === "drinks" ? "font-bold" : null}`}
          onClick={() => setSelectedCategory("drinks")}
        >
          DRINKS
        </button>
      </div>
      <div className="w-full max-w-[1000px] flex flex-col items-center mt-5 gap-3">
        {selectedCategory === "food" ? (
          <>
            <MealCategory title="starters" meals={starters} />
            <MealCategory title="soups" meals={soups} />
            <MealCategory title="main courses" meals={mainCourses} />
            <MealCategory title="desserts" meals={desserts} />
            <MealCategory title="breads" meals={breads} />
          </>
        ) : (
          <>
            <DrinkCategory title="soft drinks" drinks={soft} />
            <DrinkCategory title="lemonades" drinks={lemonade} />
            <DrinkCategory title="beers" drinks={beer} />
            <DrinkCategory title="coffees" drinks={coffee} />
            <DrinkCategory title="hot drinks" drinks={hotDrink} />
            <DrinkCategory title="rums" drinks={rum} />
            <DrinkCategory title="whiskeys" drinks={whiskey} />
            <DrinkCategory title="cognacs" drinks={cognac} />
            <DrinkCategory title="liqueurs" drinks={liqueur} />
            <DrinkCategory title="spirits" drinks={spirit} />
            <DrinkCategory title="mixed drinks" drinks={mixedDrink} />
          </>
        )}
      </div>
    </main>
  );
};

export default Menu;
