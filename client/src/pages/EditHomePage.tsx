import { FormEvent, useEffect, useState } from "react";
import PageData from "../types/Page";
import getPageData from "../functions/getPageData";
import axios from "axios";

const EditHomePage = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [section1Title, setSection1Title] = useState("");
  const [section2Title, setSection2Title] = useState("");
  const [section3Title, setSection3Title] = useState("");
  const [section4Title, setSection4Title] = useState("");
  const [section5Title, setSection5Title] = useState("");
  const [section1Link, setSection1Link] = useState("");
  const [section3Link, setSection3Link] = useState("");
  const [section4Link, setSection4Link] = useState("");
  const [section5Link, setSection5Link] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPageData("home");
      setPageData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSection1Title(pageData?.section1Title || "");
    setSection2Title(pageData?.section2Title || "");
    setSection3Title(pageData?.section3Title || "");
    setSection4Title(pageData?.section4Title || "");
    setSection5Title(pageData?.section5Title || "");
    setSection1Link(pageData?.section1Link || "");
    setSection3Link(pageData?.section3Link || "");
    setSection4Link(pageData?.section4Link || "");
    setSection5Link(pageData?.section5Link || "");
  }, [pageData]);

  const handleSubmit = async () => {
    axios.put("https://restaurant-page-eanp.onrender.com/api/update-page/home", {
      section1Title,
      section2Title,
      section3Title,
      section4Title,
      section5Title,
      section1Link,
      section3Link,
      section4Link,
      section5Link,
    });
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="uppercase text-4xl my-5 text-orange-400 text-center">home page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium">Section 1 Title</label>
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
          <label htmlFor="title" className="mb-2 font-medium">Section 2 Title</label>
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
          <label htmlFor="title" className="mb-2 font-medium">Section 3 Title</label>
          <input
            type="text"
            id="section3title"
            name="section3title"
            value={section3Title}
            onChange={(e) => setSection3Title(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium">Section 4 Title</label>
          <input
            type="text"
            id="section4title"
            name="section4title"
            value={section4Title}
            onChange={(e) => setSection4Title(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium">Section 5 Title</label>
          <input
            type="text"
            id="section5title"
            name="section5title"
            value={section5Title}
            onChange={(e) => setSection5Title(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="link" className="mb-2 font-medium">Section 1 Link</label>
          <input
            type="text"
            id="section1link"
            name="section1link"
            value={section1Link}
            onChange={(e) => setSection1Link(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="link" className="mb-2 font-medium">Section 3 Link</label>
          <input
            type="text"
            id="section3link"
            name="section3link"
            value={section3Link}
            onChange={(e) => setSection3Link(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="link" className="mb-2 font-medium">Section 4 Link</label>
          <input
            type="text"
            id="section4link"
            name="section4link"
            value={section4Link}
            onChange={(e) => setSection4Link(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="link" className="mb-2 font-medium">Section 5 Link</label>
          <input
            type="text"
            id="section5link"
            name="section5link"
            value={section5Link}
            onChange={(e) => setSection5Link(e.target.value)}
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

export default EditHomePage;
