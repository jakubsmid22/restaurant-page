import Modal from "react-modal";
import DrinkType from "../types/Drink";
import { useEffect, useState } from "react";
import axios from "axios";
import DrinksType from "../types/Drinks";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
    borderRadius: "0.5rem",
    backgroundColor: "#f9fafb",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "750px",
  },
};

Modal.setAppElement("#root");

const drinkTypes = [
  "soft",
  "lemonade",
  "beer",
  "coffee",
  "hot drink",
  "rum",
  "whiskey",
  "cognac",
  "liqueur",
  "spirit",
  "mixed drink",
];

const EditDrinks = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [drinks, setDrinks] = useState<DrinksType | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("soft");
  const [image, setImage] = useState<string | null>(null);
  const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);

  const openModal = (drink: DrinkType | null) => {
    if (drink) {
      setSelectedDrinkId(drink._id);
      setName(drink.name);
      setPrice(drink.price);
      setAmount(drink.amount);
      setType(drink.type);
      setIsOpen(true);
    } else {
      setSelectedDrinkId(null);
      setName("");
      setPrice(0);
      setAmount(0);
      setType("soft");
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
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
    getDrinks();
  }, []);

  const deleteDrink = (id: String) => {
    if (!window.confirm("Are you sure you want to delete this drink?")) {
      return;
    }

    axios
      .delete(`https://restaurant-page-eanp.onrender.com/api/delete-drink/${id}`)
      .then(() => {
        getDrinks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editDrink = (id: string) => {
    axios
      .put(`https://restaurant-page-eanp.onrender.com/api/update-drink/${id}`, {
        name,
        price,
        amount,
        type,
      })
      .then(() => {
        getDrinks();
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addDrink = () => {
    axios
      .post("https://restaurant-page-eanp.onrender.com/api/add-drink", {
        name,
        price,
        amount,
        type,
      })
      .then(() => {
        getDrinks();
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">DRINKS</h1>
        <div className="text-center mb-4">
          <button 
            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            onClick={() => openModal(null)}
          >
            Add Drink
          </button>
        </div>
        <div className="space-y-4">
          {drinks?.data.map((drink) => (
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow" key={drink._id}>
              <p className="text-lg">{drink.name}</p>
              <div className="flex space-x-2">
                <FaEdit
                  className="text-orange-400 cursor-pointer hover:text-orange-600"
                  onClick={() => openModal(drink)}
                />
                <MdDelete
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => deleteDrink(drink._id)}
                />
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Drink"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedDrinkId ? "Edit Drink" : "Add Drink"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedDrinkId) {
                editDrink(selectedDrinkId);
              } else {
                addDrink();
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                placeholder="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium">Price</label>
              <input
                type="number"
                id="price"
                placeholder="price"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                id="amount"
                placeholder="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium">Image URL</label>
              <input
                type="text"
                id="image"
                placeholder="image"
                value={image ? image : ""}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium">Type</label>
              <select
                name="type"
                id="type"
                value={type}
                required
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                {drinkTypes.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <input 
              type="submit" 
              value="SAVE" 
              className="w-full bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600 transition cursor-pointer" 
            />
          </form>
        </Modal>
      </div>
    </main>
  );
};

export default EditDrinks;
