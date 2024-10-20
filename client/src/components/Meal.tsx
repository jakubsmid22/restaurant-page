import { CiImageOn } from "react-icons/ci";
import { MealType } from "../types/Meal";
import Modal from "react-modal";
import { useState } from "react";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "350px",
  },
};

Modal.setAppElement("#root");

const Meal = ({ mealData }: { mealData: MealType }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { name, price, grammage, image, alergens } = mealData;
  const alergensString = alergens ? alergens.join(",") : "";

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex w-full justify-between text-sm md:text-lg">
      <div className="flex items-center">
        <p>
          <span className="font-bold">{grammage && `${grammage}g`}</span> {name}
          {`${alergensString ? ` | ${alergensString}` : ""}`}
          {image && (
            <CiImageOn
              className="ml-2 cursor-pointer text-lg inline"
              onClick={openModal}
            />
          )}
        </p>
      </div>
      <p>{price}€</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <img src={image ?? ""} alt={`${name}-img`} />
        <p className="text-center">{name}</p>
        <p className="text-center font-bold text-orange-400 text-lg">
          {price}€
        </p>
      </Modal>
    </div>
  );
};

export default Meal;
