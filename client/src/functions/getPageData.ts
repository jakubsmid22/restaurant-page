import axios from "axios";
import PageData from "../types/Page";

const getPageData = async (page: string | null): Promise<PageData | null> => {
    try {
        const response = await axios.get("http://localhost:3000/api/page/" + page);
        return response.data.data;
      } catch (error) {
        console.error(error);
        return null;
      }
};

export default getPageData;