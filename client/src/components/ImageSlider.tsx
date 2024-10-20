import { useEffect, useState } from "react";
import Modal from "react-modal";
import ImageType from "../types/Image";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ImageSlider = ({
  isOpen,
  images,
  onClose,
}: {
  isOpen: boolean;
  images: ImageType[] | null;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      onClose();
      setCurrentIndex(0);
    }
  }, [isOpen, onClose]);

  const handleNext = () => {
    if (images) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (images) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="flex flex-col items-center relative">
        <div
          onClick={handlePrev}
          className="bg-black absolute top-0 left-0 bottom-0 w-8 flex justify-center items-center bg-opacity-50 hover:bg-opacity-75 cursor-pointer transition-all duration-500"
        >
          <FaRegArrowAltCircleLeft className="top-1/2 -translate-y-1/2 text-white" />
        </div>
        {images && images.length > 0 && (
          <img
            className="w-full max-w-[700px]"
            src={images[currentIndex].url}
            alt={`Image ${currentIndex + 1}`}
          />
        )}
        <div
          onClick={handleNext}
          className="bg-black absolute top-0 right-0 bottom-0 w-8 flex justify-center items-center bg-opacity-50 hover:bg-opacity-75 cursor-pointer transition-all duration-500"
        >
          <FaRegArrowAltCircleRight className="top-1/2 -translate-y-1/2 text-white" />
        </div>
      </div>
    </Modal>
  );
};

export default ImageSlider;
