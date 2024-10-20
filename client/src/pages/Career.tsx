import { useEffect, useState } from "react";
import getPageData from "../functions/getPageData";
import PageData from "../types/Page";
import axios from "axios";
import PositionType from "../types/Position";

const Career = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [positions, setPositions] = useState<PositionType[] | null>(null);

  const getPositions = () => {
    axios
      .get("http://localhost:3000/api/wanted-positions")
      .then((response) => {
        setPositions(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPageData("career");
      setPageData(data);
    };

    fetchData();
    getPositions();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-between pb-24 text-center text-lg p-5">
      <div className="space-y-7 flex flex-col items-center">
        <h1 className="uppercase text-4xl my-5 text-orange-400">career</h1>
        <div className="flex flex-col items-center">
          <h1 className="text-orange-400 text-2xl uppercase mb-2">
            {pageData?.section1Title}
          </h1>
          <ul>
            {positions?.map((position) => (
              <li className="font-bold uppercase" key={position._id}>
                {position.position}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-orange-400 text-2xl uppercase mb-2">
            {pageData?.section2Title}
          </h1>
          <p className="font-bold uppercase">{pageData?.section2Content}</p>
        </div>
        <div>
          <h1 className="text-orange-400 text-2xl uppercase mb-2">
            {pageData?.section3Title}
          </h1>
          <p className="font-bold uppercase">{pageData?.section3Content}</p>
        </div>
        <hr className="border-t-2 border-orange-400 w-full my-8" />
        <h1
          className="mt-14 font-bold text-xl uppercase w-[475px]"
          dangerouslySetInnerHTML={{ __html: pageData?.section4Title || "" }}
        />
      </div>
      <img src={pageData?.img} alt="career-img" className="w-[475px] mt-5" />
    </main>
  );
};

export default Career;
