import axios from "axios";
import { useEffect, useState } from "react";
import getPageData from "../functions/getPageData";
import PageData from "../types/Page";

const EditContactPage = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [section1Title, setSection1Title] = useState("");
  const [section2Title, setSection2Title] = useState("");
  const [section3Title, setSection3Title] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPageData("contact");
      setPageData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSection1Title(pageData?.section1Title || "");
    setSection2Title(pageData?.section2Title || "");
    setSection3Title(pageData?.section3Title || "");
  }, [pageData]);

  const handleSubmit = async () => {
    axios.put("https://restaurant-page-eanp.onrender.com/api/update-page/contact", {
      section1Title,
      section2Title,
      section3Title,
    });
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="uppercase text-4xl my-5 text-orange-400 text-center">
        Contact Page
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="section1title" className="mb-2 font-medium">
            Section 1 Title
          </label>
          <input
            type="text"
            id="section1title"
            name="section1title"
            value={section1Title}
            onChange={(e) => setSection1Title(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="section2title" className="mb-2 font-medium">
            Section 2 Title
          </label>
          <input
            type="text"
            id="section2title"
            name="section2title"
            value={section2Title}
            onChange={(e) => setSection2Title(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="section3title" className="mb-2 font-medium">
            Section 3 Title
          </label>
          <input
            type="text"
            id="section3title"
            name="section3title"
            value={section3Title}
            onChange={(e) => setSection3Title(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <input
          type="submit"
          value="SAVE"
          className="mt-4 p-2 bg-orange-400 text-white rounded-md hover:bg-orange-600 cursor-pointer"
        />
      </form>
    </main>
  );
};

export default EditContactPage;
