import API_URL from "@/constants";
import axios from "axios";
import { useQuery } from "react-query";

const getUser = async () => {
    return await axios.get(API_URL + 'auth/profile', {withCredentials: true});
}

const useUser= () => {
    return useQuery(['user'], getUser);
};

export default useUser;