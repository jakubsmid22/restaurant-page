import { useEffect, useState } from "react";
import ImagesType from "../types/Images";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Modal from "react-modal";
import ImageType from "../types/Image";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "750px",
  },
};

Modal.setAppElement("#root");

const imagesTypes = ["interior", "meals", "team"];

const EditGallery = () => {
  const [images, setImages] = useState<ImagesType | null>(null);
  const [type, setType] = useState("interior");
  const [url, setUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const getImages = () => {
    axios
      .get("https://restaurant-page-eanp.onrender.com/api/gallery")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  const deleteImage = (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    axios
      .delete(
        `https://restaurant-page-eanp.onrender.com/api/delete-image/${id}`
      )
      .then(() => {
        getImages();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModal = (image: ImageType | null) => {
    if (image) {
      setType(image.type);
      setUrl(image.url);
      setIsOpen(true);
      setSelectedImageId(image._id);
    } else {
      setType("interior");
      setUrl("");
      setIsOpen(true);
      setSelectedImageId(null);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const editImage = (id: string) => {
    axios
      .put(`https://restaurant-page-eanp.onrender.com/api/update-image/${id}`, {
        type,
        url,
      })
      .then(() => {
        getImages();
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addImage = () => {
    axios
      .post("https://restaurant-page-eanp.onrender.com/api/add-image", {
        type,
        url,
      })
      .then(() => {
        getImages();
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Gallery</h1>
      <button
        onClick={() => openModal(null)}
        className="mb-5 bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Add Image
      </button>
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-[1000px]">
        {images?.data.map((image) => (
          <div className="relative" key={image._id}>
            <img
              className="w-96 h-96 object-cover rounded shadow"
              src={image.url}
              alt={image.type}
            />
            <div
              onClick={() => deleteImage(image._id)}
              className="absolute top-2 right-2 bg-white text-xl rounded-sm hover:bg-red-600 hover:text-white cursor-pointer transition-all p-2"
            >
              <MdDelete />
            </div>
            <div
              onClick={() => openModal(image)}
              className="absolute top-2 left-2 bg-white text-xl rounded-sm hover:bg-orange-600 hover:text-white cursor-pointer transition-all p-2"
            >
              <CiEdit />
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Image"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedImageId ? editImage(selectedImageId) : addImage();
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Image URL"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded p-2 w-full"
          >
            {imagesTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="submit"
            value="SAVE"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 cursor-pointer transition"
          />
        </form>
      </Modal>
    </main>
  );
};

export default EditGallery;
