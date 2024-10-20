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
      .get("http://localhost:3000/api/gallery")
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
    axios
      .delete(`http://localhost:3000/api/delete-image/${id}`)
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
      .put(`http://localhost:3000/api/update-image/${id}`, { type, url })
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
      .post("http://localhost:3000/api/add-image", { type, url })
      .then(() => {
        getImages();
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="flex flex-col items-center">
      <h1>Gallery</h1>
      <button onClick={() => openModal(null)}>Add Image</button>
      <div className="flex flex-wrap justify-center gap-2 w-full max-w-[1000px]">
        {images?.data.map((image) => (
          <div className="relative" key={image._id}>
            <img className="w-96 h-96 object-cover" src={image.url} />
            <div
              onClick={() => deleteImage(image._id)}
              className="absolute top-2 right-2 bg-white text-xl rounded-sm hover:bg-red-600 hover:text-white cursor-pointer transition-all  "
            >
              <MdDelete />
            </div>
            <div
              onClick={() => openModal(image)}
              className="absolute top-2 left-2 bg-white text-xl rounded-sm hover:bg-red-600 hover:text-white cursor-pointer transition-all  "
            >
              <CiEdit />
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Edit Image"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedImageId ? editImage(selectedImageId) : addImage();
          }}
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            {imagesTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input type="submit" value="SAVE" />
        </form>
      </Modal>
    </main>
  );
};

export default EditGallery;
