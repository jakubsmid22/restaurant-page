import axios from "axios";
import { useEffect, useState } from "react";
import ImagesType from "../types/Images";
import ImageType from "../types/Image";
import ImageSlider from "../components/ImageSlider";
import PageData from "../types/Page";
import getPageData from "../functions/getPageData";

const Gallery = () => {
  const [images, setImages] = useState<ImagesType | null>(null);
  const [interior, setInterior] = useState<ImageType[] | null>(null);
  const [meals, setMeals] = useState<ImageType[] | null>(null);
  const [team, setTeam] = useState<ImageType[] | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<ImageType[] | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);

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
    const fetchData = async () => {
      const data = await getPageData("menu");
      setPageData(data);
    };

    fetchData();
    getImages();
  }, []);

  useEffect(() => {
    if (images) {
      setInterior(images.data.filter((image) => image.type === "interior"));
      setMeals(images.data.filter((image) => image.type === "meals"));
      setTeam(images.data.filter((image) => image.type === "team"));
    }
  }, [images]);

  const openSlider = (imageType: ImageType[]) => {
    setCurrentImages(imageType);
    setIsSliderOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-5">
      <h1 className="uppercase text-4xl text-orange-400 my-10">Gallery</h1>

      <div className="flex justify-center flex-wrap max-w-[1200px] gap-5">
        {interior && interior.length > 0 && (
          <div
            onClick={() => openSlider(interior || [])}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
              <p className="text-white uppercase text-3xl text-center">{pageData?.section1Title}</p>
            </div>
            <img
              className="w-80 h-80 object-cover"
              src={interior ? interior[0].url : ""}
              alt="Interior"
            />
          </div>
        )}
        {meals && meals.length > 0 && (
          <div
            onClick={() => openSlider(meals || [])}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
              <p className="text-white uppercase text-3xl text-center">{pageData?.section2Title}</p>
            </div>
            <img
              className="w-80 h-80 object-cover"
              src={meals ? meals[0].url : ""}
              alt="Meals"
            />
          </div>
        )}
        {team && team.length > 0 && (
          <div
            onClick={() => openSlider(team || [])}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
              <p className="text-white uppercase text-3xl text-center">{pageData?.section3Title}</p>
            </div>
            <img
              className="w-80 h-80 object-cover"
              src={team ? team[0].url : ""}
              alt="Team"
            />
          </div>
        )}
      </div>

      <ImageSlider
        isOpen={isSliderOpen}
        images={currentImages}
        onClose={() => setIsSliderOpen(false)}
      />
    </main>
  );
};

export default Gallery;
