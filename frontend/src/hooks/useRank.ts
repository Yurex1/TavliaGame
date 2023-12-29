import API_URL from "@/constants";
import axios from "axios";
import { useQuery } from "react-query";

const getRank = async () => {
    return await axios.get(API_URL + 'auth');
}

const useRank= () => {
    return useQuery(['users'], getRank);
};

export default useRank;