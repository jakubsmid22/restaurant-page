import axios from "axios";
import { MenuType } from "../types/Menu";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import { MealType } from "../types/Meal";

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

const EditMeals = () => {
  const [menu, setMenu] = useState<MenuType | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [grammage, setGrammage] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [alergens, setAlergens] = useState<string[]>([]);
  const [type, setType] = useState("main");
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  const mealTypes = ["main", "soup", "starter", "dessert", "bread"];

  const openModal = (meal: MealType | null) => {
    if (meal) {
      setSelectedMealId(meal._id);
      setName(meal.name);
      setPrice(meal.price);
      setImage(meal.image);
      setAlergens(meal.alergens);
      setType(meal.type);
    } else {
      setSelectedMealId(null);
      setName("");
      setPrice(0);
      setImage(null);
      setAlergens([]);
      setType("main");
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getMenu = () => {
    axios
      .get("http://localhost:3000/api/all-meals")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMenu();
  }, []);

  const deleteMeal = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) {
      return;
    }

    axios
      .delete(`http://localhost:3000/api/delete-meal/${id}`)
      .then(() => {
        getMenu();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editMeal = (id: string) => {
    axios
      .put(`http://localhost:3000/api/update-meal/${id}`, {
        name,
        price,
        grammage: grammage || null,
        image,
        alergens,
        type,
      })
      .then(() => {
        getMenu();
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addMeal = () => {
    axios
      .post("http://localhost:3000/api/add-meal", {
        name,
        price,
        grammage: grammage || null,
        image,
        alergens,
        type,
      })
      .then(() => {
        getMenu();
        closeModal();
        setSelectedMealId(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Meals</h1>
        <div className="text-center mb-4">
          <button
            onClick={() => openModal(null)}
            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Add Meal
          </button>
        </div>
        <div className="space-y-4">
          {menu?.data.map((meal) => (
            <div
              className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
              key={meal._id}
            >
              <p className="text-lg">{meal.name}</p>
              <div className="flex space-x-2">
                <FaEdit
                  onClick={() => openModal(meal)}
                  className="text-orange-400 cursor-pointer hover:text-orange-600"
                />
                <MdDelete
                  onClick={() => deleteMeal(meal._id)}
                  className="text-red-500 cursor-pointer hover:text-red-600"
                />
              </div>
            </div>
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Meal Modal"
        >
          <h2 className="text-2xl font-bold mb-4">
            {selectedMealId ? "Edit Meal" : "Add Meal"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              selectedMealId ? editMeal(selectedMealId) : addMeal();
            }}
            className="space-y-4"
          >
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />

            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Price"
              required
              value={price || ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
            />

            <label htmlFor="grammage" className="block text-sm font-medium">
              Grammage
            </label>
            <input
              type="number"
              id="grammage"
              placeholder="Grammage"
              value={grammage || ""}
              onChange={(e) => setGrammage(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
            />

            <label htmlFor="image" className="block text-sm font-medium">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              placeholder="Image URL"
              value={image || ""}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />

            <label htmlFor="alergens" className="block text-sm font-medium">
              Alergens (comma separated)
            </label>
            <input
              type="text"
              id="alergens"
              placeholder="Alergens"
              value={alergens.join(",")}
              onChange={(e) => setAlergens(e.target.value.split(","))}
              className="w-full border border-gray-300 rounded p-2"
            />

            <label htmlFor="type" className="block text-sm font-medium">
              Meal Type
            </label>
            <select
              name="type"
              id="type"
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              {mealTypes.map((mealType, i) => (
                <option key={i} value={mealType}>
                  {mealType}
                </option>
              ))}
            </select>

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

export default EditMeals;
