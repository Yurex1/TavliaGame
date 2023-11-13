import axios from "axios";
import { get } from "http";
import { useQuery } from "react-query";

const getUser = async () => {
    return await axios.get('/profile');
}

const useUser= () => {
    return useQuery(['user'], getUser);
};

export default useUser;