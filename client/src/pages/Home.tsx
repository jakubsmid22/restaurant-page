import { useEffect, useState } from "react";
import PageData from "../types/Page";
import getPageData from "../functions/getPageData";

const Home = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPageData("home");
      setPageData(data);
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-4 grid-rows-5 h-screen text-white">
        <section className="col-span-4 row-span-1 md:col-span-2 md:row-span-2 flex justify-center items-center bg-cover bg-[url(/home-section1-bg.jpg)] relative">
          <a href={pageData?.section1Link}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <h1 className="relative z-10 text-white text-4xl uppercase text-center">
              {pageData?.section1Title}
            </h1>
          </a>
        </section>
        <section className="col-span-4 row-span-1 md:col-span-2 md:row-span-3 flex justify-center items-center bg-cover bg-[url(/home-section2-bg.jpg)] relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="relative z-10 text-white text-4xl uppercase text-center">
            {pageData?.section2Title}
          </h1>
        </section>
        <section className="col-span-4 row-span-1 md:col-span-2 md:row-span-3 flex justify-center items-center bg-cover bg-[url(/home-section3-bg.jpg)] relative">
          <a href={pageData?.section3Link}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <h1 className="relative z-10 text-white text-4xl uppercase text-center">
              {pageData?.section3Title}
            </h1>
          </a>
        </section>
        <section className="col-span-4 row-span-1 md:col-span-1 md:row-span-2 flex justify-center items-center bg-cover bg-[url(/home-section4-bg.jpg)] relative">
          <a href={pageData?.section4Link}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <h1 className="relative z-10 text-white text-4xl uppercase text-center">
              {pageData?.section4Title}
            </h1>
          </a>
        </section>
        <section className="col-span-4 row-span-1 md:col-span-1 md:row-span-2 flex justify-center items-center bg-cover bg-[url(/home-section5-bg.jpg)] relative">
          <a href={pageData?.section5Link}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <h1 className="relative z-10 text-white text-4xl uppercase text-center">
              {pageData?.section5Title}
            </h1>
          </a>
        </section>
      </div>
    </main>
  );
};

export default Home;
